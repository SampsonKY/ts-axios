//项目中所有公共类型定义文件

//让method只能传入合法字符串
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

//请求参数配置
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  //指定响应数据类型
  responseType?: XMLHttpRequestResponseType
  //指定超时时间
  timeout?: number
}

//响应参数接口
export interface AxiosResponse<T = any> {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * axios函数返回的是一个promise对象，可以定义一个
 * AxiosPromise 接口，它继承于Promise<AxiosResponse>这个泛型接口
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 对错误信息增强，供外部使用
 */

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * 拓展axios，为所有支持请求方法扩展一些接口
 */

//描述了 Axios 类中的公共方法
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}
//继承自 Axios 类，它是一个混合类型的接口。
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
