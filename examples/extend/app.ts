import axios from '../../src'

// 测试 axios 改进为混合对象后的效果
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})
axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

// 测试 axios 两种传参方式
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

/**
 * 此处定义了返回数据的类型接口 ResponseData 和 User
 * 然后将接口传入 axios 函数
 * 这样 ts 就可以推断出返回的数据的类型
 * test 函数就可以直接打印 user.result.name
 */
interface ResponseData<T=any> {
  code: number
  result: T
  message: string
}
interface User {
  name: string
  age: number
}
function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}
async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}
test()
