import { AxiosRequestConfig, AxiosResponse } from '../types'

/**
 * AxiosError 继承于 Error 类，添加了一些自己的属性
 */

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    //注意，这段代码目的是为了解决TS继承内置对象的一些坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 为了方便使用，对外暴露一个 createError 工厂方法。
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
