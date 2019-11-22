import { AxiosPromise, AxiosRequestConfig } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { processHeaders } from '../helpers/headers'
import { transformRequest } from '../helpers/data'

export default function(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  // 发送请求
  return xhr(config)
}

// 处理 config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config) // 注意 headers 要先于 data 处理
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
