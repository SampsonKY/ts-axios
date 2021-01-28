import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  //实例化Axios实例context
  const context = new Axios()
  //创建instance指向Axios.prototype.request方法，并绑定上下文context
  const instance = Axios.prototype.request.bind(context)
  //将context中的原型方法和实例方法全部拷贝到instance上，这样就实现了一个混合对象
  extend(instance, context)
  //instance本身是一个函数，又拥有Axios类所有原型和实例属性
  return instance as AxiosInstance
}

//通过createInstance工厂函数创建axios
const axios = createInstance()

export default axios
