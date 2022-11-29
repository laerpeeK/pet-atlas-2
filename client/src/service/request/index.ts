import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { InstanceConfig, instanceInterceptors } from './type'

class Request {
  instance: AxiosInstance
  instanceInterceptors?: instanceInterceptors

  constructor(config: InstanceConfig) {
    this.instance = axios.create(config)
    this.instanceInterceptors = config.instanceInterceptors //实例拦截器

    // 拦截器执行顺序： 实例请求 -> 类请求 -> 实例响应 -> 类响应
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (err) => {
        console.log('全局请求拦截器报错：')
        console.log(err)
        return err
      }
    )

    // 实例请求/响应拦截器
    this.instance.interceptors.request.use(
      this.instanceInterceptors?.requestInterceptors,
      this.instanceInterceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.instanceInterceptors?.responseInterceptors,
      this.instanceInterceptors?.responseInterceptorsCatch
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (err) => {
        console.log('全局响应拦截器报错：')
        console.log(err)
        return err
      }
    )
  }

  request<T>(config: InstanceConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  get<T>(config: InstanceConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
}

export default Request
