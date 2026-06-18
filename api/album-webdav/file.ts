type VercelRequest = {
  method?: string
  url?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}

type VercelResponse = {
  status: (code: number) => VercelResponse
  setHeader: (name: string, value: string | number) => void
  send: (body: string | Buffer) => void
}

import { handleAlbumWebdavHttp } from '../../server/albumWebdavHttp'

async function sendVercelResponse(res: VercelResponse, response: Response) {
  res.status(response.status)

  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    res.send(await response.text())
    return
  }

  res.send(Buffer.from(await response.arrayBuffer()))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers.host || 'localhost'
  const requestUrl = `https://${host}${req.url || '/api/album-webdav/file'}`
  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string')
      headers.set(key, value)
    else if (Array.isArray(value))
      headers.set(key, value.join(', '))
  }

  const request = new Request(requestUrl, {
    method: req.method,
    headers,
  })

  const response = await handleAlbumWebdavHttp(request)
  await sendVercelResponse(res, response)
}
