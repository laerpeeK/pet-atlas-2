import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface instanceInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: <T = AxiosResponse>(res: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface InstanceConfig extends AxiosRequestConfig {
  instanceInterceptors?: instanceInterceptors
}
