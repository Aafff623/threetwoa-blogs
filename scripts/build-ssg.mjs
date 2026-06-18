import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const BUILD_DONE_MARKERS = [
  '[HOOK] build:after done',
  'RSS Feed Files',
]
const GRACE_MS = 1200
const HEARTBEAT_MS = 45_000
const MAX_MS = 20 * 60 * 1000
const DIST_READY_TIMEOUT_MS = 300_000
const DIST_READY_POLL_MS = 500

const require = createRequire(import.meta.url)
const valaxyBin = require.resolve('valaxy/bin/valaxy.mjs')
const distIndex = resolve(process.cwd(), 'dist/index.html')

const child = spawn(process.execPath, [valaxyBin, 'build', '--ssg'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
  windowsHide: true,
})

let finished = false
let successTimer
let outputBuffer = ''

function killChildTree() {
  if (!child.pid)
    return

  if (process.platform === 'win32') {
    spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true,
    })
    return
  }

  try {
    child.kill('SIGKILL')
  }
  catch {}
}

function isDistIndexReady() {
  if (!existsSync(distIndex))
    return false

  try {
    const html = readFileSync(distIndex, 'utf-8')
    // 空模板时 #app 内无内容；SSG 完成后会注入组件和初始状态
    return html.includes('__INITIAL_STATE__')
      || html.includes('sakura-app-sidebar')
      || html.includes('class="sakura-page')
  }
  catch {
    return false
  }
}

function waitForDistReady(callback) {
  if (isDistIndexReady()) {
    callback(true)
    return
  }

  const start = Date.now()
  const timer = setInterval(() => {
    if (finished) {
      clearInterval(timer)
      return
    }

    if (isDistIndexReady()) {
      clearInterval(timer)
      callback(true)
      return
    }

    if (Date.now() - start > DIST_READY_TIMEOUT_MS) {
      clearInterval(timer)
      callback(false)
    }
  }, DIST_READY_POLL_MS)
}

function finishSuccess() {
  if (finished)
    return
  finished = true
  clearTimeout(maxTimer)
  clearTimeout(successTimer)
  clearInterval(heartbeatTimer)

  if (!existsSync(distIndex)) {
    console.error('\n构建流程已结束，但未找到 dist/index.html，请检查构建日志。\n')
    killChildTree()
    process.exit(1)
    return
  }

  console.log('\n✓ 构建已完成，正在结束进程…\n')
  killChildTree()
  setTimeout(() => process.exit(0), 200)
}

function finishError(code) {
  if (finished)
    return
  finished = true
  clearTimeout(maxTimer)
  clearTimeout(successTimer)
  clearInterval(heartbeatTimer)
  process.exit(code ?? 1)
}

function scheduleSuccess() {
  clearTimeout(successTimer)
  // 匹配到完成标记后，等待 dist/index.html 真正写入 SSG 内容再结束
  waitForDistReady((ready) => {
    if (!ready) {
      console.error('\n构建标记已触发，但 dist/index.html 未检测到 SSG 内容，请检查构建日志。\n')
      finishError(1)
      return
    }
    successTimer = setTimeout(finishSuccess, GRACE_MS)
  })
}

function inspectOutput(text) {
  outputBuffer += text
  if (outputBuffer.length > 8192)
    outputBuffer = outputBuffer.slice(-8192)

  if (BUILD_DONE_MARKERS.some(marker => outputBuffer.includes(marker)))
    scheduleSuccess()
}

const heartbeatTimer = setInterval(() => {
  if (finished)
    return
  console.log('\n⏳ 仍在构建中（SSG 预渲染可能较慢，请稍候）…\n')
}, HEARTBEAT_MS)

const maxTimer = setTimeout(() => {
  if (finished)
    return
  console.error('\nSSG 构建超时（20 分钟）。\n')
  killChildTree()
  finishError(1)
}, MAX_MS)

child.stdout.on('data', (chunk) => {
  const text = chunk.toString()
  process.stdout.write(text)
  inspectOutput(text)
})

child.stderr.on('data', (chunk) => {
  const text = chunk.toString()
  process.stderr.write(text)
  inspectOutput(text)
})

child.on('error', (error) => {
  console.error(error)
  finishError(1)
})

child.on('close', (code) => {
  if (finished)
    return
  // 子进程已自然退出，再确认 dist 是否就绪
  waitForDistReady((ready) => {
    if (ready || (code === 0 && existsSync(distIndex)))
      finishSuccess()
    else
      finishError(code)
  })
})
