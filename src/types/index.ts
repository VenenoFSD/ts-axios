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
  url: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 响应返回结果
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// xhr 处理响应结果，包装为 Promise 对象返回
export interface AxiosPromise extends Promise<AxiosResponse> {}

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
