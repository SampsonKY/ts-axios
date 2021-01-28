import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequst'

/**
 * 对于 `get`、`delete`、`head`、`options`、`post`、`patch`、`put` 这些方法，都是对外提供的语法糖，内部都是通过调用 `request` 方法实现发送请求，
 * 只不过在调用之前对 `config` 做了一层合并处理。
 */

export default class Axios {
  //支持传入两个参数
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('head', url, config)
  }

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('options', url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('post', url, data, config)
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
