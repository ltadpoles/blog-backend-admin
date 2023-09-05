/**
 * @description 用户api
 */

import http from '@/utils/http'
import { ENV } from '../config'

// 用户登录
export const loginIn = (data) => {
  return http.post(ENV.TARGETURL + '/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return http.get(ENV.TARGETURL + '/user/info')
}

// 刷新 token
export const refreshToken = () => {
  return null
}

// 用户列表
export const userList = (data) => {
  return http.post(ENV.TARGETURL + '/user/list', data)
}
