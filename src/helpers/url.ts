/**
 * 处理 url 参数
 * 1. url: '/get#a' ===> 丢弃 hash 标记 ===> /get
 *
 * 处理 params 参数并将其拼接到 url 后
 * 1. params: { a: 1, b: 2 } ===> /get?a=1&b=2
 * 2. params: { foo: ['bar', 'baz'] } ===> /get?foo[]=bar&foo[]=baz
 * 3. params: { foo: { a: 'b' } } ===> 对象转字符串再编码 ===>  /get?foo="%7B%22a%22:%22b%22%7D"
 * 4. params: { date: new Date() } ===> toISOString() ===> /get?date=2019-11-04T06:10:30.495Z
 * 5. params: { a: null, b: undefined } ===> 值为 null 或 undefined 抛弃 ===> /get
 * 6. 对于字符 @ : $ , [ ] 予以保留，将空白符转为 +
 */

import { isDate, isPlainObject } from './util'

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  let parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 针对数组的处理：统一转为数组
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // Date
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // Object
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    // hash
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

// 自定义 encode
function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
    .replace(/%20/g, '+')
}
