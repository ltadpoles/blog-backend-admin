/**
 * @description 文章类别api
 */
import http from '@/utils/http'
import { ENV } from '../config'

export const categoryAdd = data => {
  return http.post(ENV.TARGETURL + '/category/add', data)
}

export const categoryList = data => {
  return http.post(ENV.TARGETURL + '/category/list', data)
}

export const categoryDel = params => {
  return http.get(ENV.TARGETURL + '/category/del', { params })
}

export const categoryUpdate = data => {
  return http.post(ENV.TARGETURL + '/category/update', data)
}