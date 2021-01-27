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
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  //指定响应数据类型
  responseType?: XMLHttpRequestResponseType
}

//响应参数接口
export interface AxiosResponse {
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
export interface AxiosPromise extends Promise<AxiosResponse> {}
