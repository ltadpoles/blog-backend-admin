/**
 * @description 用户api
 */

import http from '@/utils/http'
import { ENV } from '../config'

// 用户登录
export const loginIn = (data) => {
    return http.post(ENV.TARGETURL + '/api/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
    return http.get(ENV.TARGETURL + '/user/info')
}

// 刷新 token
export const refreshToken = () => {
    return
}
