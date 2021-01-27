import { isDate, isPlainObject } from './utils'

//对特殊字符的URL进行编码
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

//处理URL，将params拼接到URL
export function buildURL(url: string, params?: any): string {
  if (!params) return url //没有参数直接返回

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    //null 和 undefined 忽略
    if (val === null || typeof val === 'undefined') {
      return //forEach中return是跳到下一次循环
    }

    let values = []
    //参数值为数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    //#后面的内容省略
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    //判断url是否已经有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
