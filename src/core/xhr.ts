import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { transformResponseData } from '../helpers/data'
import { createError } from '../helpers/error'

export default function(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    // 设置 headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    request.onreadystatechange = function() {
      if (request.readyState !== 4 || request.status === 0) {
        // 请求完成前或出错 status 均返回 0
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      let responseData = responseType === 'text' ? request.responseText : request.response
      responseData = transformResponseData(responseData)
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // 判断状态码
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    // 网络错误处理
    request.onerror = function() {
      reject(createError('Network Error', config, null, request))
    }

    // 超时处理
    request.ontimeout = function() {
      reject(createError(`Timeout of ${timeout} ms exceed`, config, 'ECCONNABOUTED', request))
    }
  })
}
