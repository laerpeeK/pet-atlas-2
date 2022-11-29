import Request from './request'
const request = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 60 * 5
  // instanceInterceptors: {
  //   requestInterceptors: (config) => {
  //     console.log('实例请求拦截器')
  //     return config
  //   },
  //   responseInterceptors: (res) => {
  //     console.log('实例响应拦截器')
  //     return res
  //   },
  // },
})

export default request
