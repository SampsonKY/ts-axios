import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequst'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

/**
 * 对于 `get`、`delete`、`head`、`options`、`post`、`patch`、`put` 这些方法，都是对外提供的语法糖，内部都是通过调用 `request` 方法实现发送请求，
 * 只不过在调用之前对 `config` 做了一层合并处理。
 */

export default class Axios {
  //默认配置
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  //支持传入两个参数
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
