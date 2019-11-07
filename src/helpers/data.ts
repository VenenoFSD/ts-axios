/**
 * config 可配置 data 属性
 * data 即为请求主体（body），get 、head 请求的请求主体为 null
 * data 会作为 XMLHttpRequest.send() 的参数传入
 * data 如果是普通对象则需先将其序列化
 *
 * 注意：如果 data 是普通对象则需设置请求头的 Content-Type 字段为 application/json;charset=utf-8 ，服务端才能正常解析 data
 */

import { isPlainObject } from './util'

// 处理 data 参数
export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data
}

/**
 * 如果请求时没有配置 responseType 为 json
 * 则服务端返回的 data 可能为 json 字符串
 * 此处尝试将其转为 json 对象
 */
export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // ...
    }
  }
  return data
}
