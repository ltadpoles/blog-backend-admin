/**
 *
 * @param {Object} data 重置对象属性
 */
export const resetData = (data) => {
  const obj = {}
  for (let key in data) {
    obj[key] = Array.isArray(data[key]) ? [] : typeof data[key] === 'object' ? {} : ''
  }
  Object.assign(data, obj)
}