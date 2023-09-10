/**
 * @description 文章api
 */

import http from '@/utils/http'
import { ENV } from '../config'

export const articleAdd = data => {
    return http.post(ENV.TARGETURL + '/article/add', data)
}