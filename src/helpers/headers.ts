import { head } from 'shelljs'
import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

//若请求体为一个普通对象，需要在headers中添加content-type属性
export function processHeaders(headers: any, data: any): any {
  //请求 header 属性是大小不敏感的
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

//对 响应头 进行格式化
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
