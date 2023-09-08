/**
 * @description 文章标签api
 */

import http from '@/utils/http'
import { ENV } from '../config'

export const tagAdd = data => {
    return http.post(ENV.TARGETURL + '/tag/add', data)
}

export const tagList = data => {
    return http.post(ENV.TARGETURL + '/tag/list', data)
}

export const tagDel = param => {
    return http.get(ENV.TARGETURL + '/tag/del', { param })
}

export const tagEdit = data => {
    return http.post(ENV.TARGETURL + '/tag/edit', data)
}