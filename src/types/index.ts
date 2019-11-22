type Methods =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 请求 config
export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 响应返回结果
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// xhr 处理响应结果，包装为 Promise 对象返回
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 扩展返回的错误信息
 * 等同于 src/helpers/error.ts - class AxiosError
 * 用于测试接口
 */
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

/** 改造 axios
 * axios 不只是一个简单的函数
 * 我们可以通过 axios.get(url, config) / axios.post(url, data, config) 等来调用函数
 * 这样 config 可以不传入 method ，url ，data 参数
 * 另外原 axios 函数改为 dispatchRequest ，等同于 axios.request
 * 此时的 axios 可以理解为一个混合对象
 * axios 本身是一个方法，同时它有属性和方法
 */

// 定义一个对象接口，包含 axios 函数的属性和方法
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * AxiosInstance 接口描述了 axios 方法
 * 同时继承 Axios 接口
 * 即为混合对象接口
 *
 * axios 方法接受两种传参方式
 * 一是接收一个 config 参数
 * 二是类似于 axios.get 方式接收 url, config 参数
 * 通过函数重载实现
 */
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
