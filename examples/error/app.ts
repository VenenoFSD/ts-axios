import axios, { AxiosError } from '../../src/index'

// 测试 404
axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

// 测试 500
axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

// 模拟网络错误
// 加载页面后在 5s 内设置控制台 network - offline
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}, 5000)

// 测试超时 / AxiosError
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log('message: ', e.message)
  console.log('isAxiosError: ', e.isAxiosError)
  console.log('config: ', e.config)
  console.log('code: ', e.code)
  console.log('request: ', e.request)
})
