/**
 * @description 文章api
 */

import http from '@/utils/http'
import { ENV } from '../config'

export const articleAdd = data => {
    return http.post(ENV.TARGETURL + '/article/add', data)
}

export const articleList = data => {
    return http.post(ENV.TARGETURL + '/article/list', data)
}

export const articleDel = params => {
    return http.get(ENV.TARGETURL + '/article/del', { params })
}

export const articleUpdate = data => {
    return http.post(ENV.TARGETURL + '/article/update', data)
}