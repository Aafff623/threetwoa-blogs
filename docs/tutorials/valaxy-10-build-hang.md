# valaxy博客全局美化教程（十）：修复构建结束的时候会卡住

原文链接：https://daily.yybb.us/posts/valaxy-10
作者：AIOVTUE

## 问题现象

执行 `pnpm build` 或 `valaxy build --ssg` 时，构建流程本身可以成功生成 `dist/`，但进程在输出结束后不会自动退出，表现为终端长时间挂起，必须手动 `Ctrl+C` 才能结束。这在 CI/CD（GitHub Actions / Vercel 等）中会导致部署任务超时失败。

## 根因

Valaxy SSG 构建完成后，部分子进程或事件循环中的句柄未能干净退出，Node 进程继续等待，造成「假死」。

## 解决思路

不修改 Valaxy 源码，而是在外层包装一个 Node 脚本：

1. 通过 `spawn` 启动 `valaxy build --ssg`。
2. 监听 stdout/stderr，匹配构建完成标记。
3. 确认 `dist/index.html` 已生成后，主动结束子进程并退出。
4. 设置 20 分钟超时兜底，避免无限挂起。

## 新增文件

### `scripts/build-ssg.mjs`

构建包装脚本：

- `BUILD_DONE_MARKERS`: 匹配构建完成标记：
  - `'[HOOK] build:after done'`
  - `'RSS Feed Files'`
- `GRACE_MS = 800`: 匹配到完成标记后等待 800ms，让后续清理操作完成。
- `HEARTBEAT_MS = 45_000`: 每 45 秒打印一次心跳，提示构建仍在进行。
- `MAX_MS = 20 * 60 * 1000`: 最大 20 分钟超时。
- `killChildTree()`: Windows 下使用 `taskkill /T /F` 结束子进程树；其他平台使用 `SIGKILL`。
- `finishSuccess()`: 检查 `dist/index.html` 存在后结束进程；不存在则报错退出。
- `finishError()`: 异常退出时清理定时器。

脚本在构建成功后主动退出，不需要用户手动中断。

## 修改文件

### `package.json`

替换原有构建脚本：

```json
{
  "scripts": {
    "build": "node scripts/build-ssg.mjs",
    "build:ssg": "node scripts/build-ssg.mjs",
    "build:ssg:raw": "valaxy build --ssg",
    "build:spa": "valaxy build",
    "dev": "valaxy",
    "fuse": "valaxy fuse",
    "rss": "valaxy rss",
    "serve": "vite preview"
  }
}
```

- `build` 与 `build:ssg` 都走 wrapper 脚本。
- `build:ssg:raw` 保留原始命令，便于调试或确认 Valaxy 本身行为。

## 验证

1. 创建 `scripts/build-ssg.mjs` 并修改 `package.json`。
2. 运行 `pnpm build`。
3. 观察构建日志：
   - 正常输出 Valaxy 构建过程。
   - 匹配到完成标记后，脚本打印 `✓ 构建已完成，正在结束进程…`。
   - 进程自动退出，返回命令提示符。
4. 检查 `dist/index.html` 存在。
5. CI/CD 中构建任务不再超时。

## 提交信息建议

```
fix(build): add SSG build wrapper to prevent process hang
```

```
docs(readme): mark Stage 10 build hang fix as complete
```

```
docs(tutorial): add Stage 10 build hang fix tutorial
```
