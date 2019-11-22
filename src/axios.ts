import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

/** 创建一个混合对象
 * 混合对象核心为 Axios.prototype.request 方法即 axios 函数本身
 * 将其与 Axios 实例混合
 * 这样可直接调用 axios 函数，也可以通过 axios.xxx 调用 Axios 类中的函数
 */
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

export default createInstance()
