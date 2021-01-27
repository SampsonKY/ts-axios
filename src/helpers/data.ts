import { cat } from 'shelljs'
import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

//对于响应数据，如果请求参数不设置responseType，服务端返回的数据是字符串类型，需要将其转换为一个JSON对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {}
  }

  return data
}
