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

/**
 *
 * @param {} obj 需要拷贝的对象
 * @returns
 */
export function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let clone = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj && obj.hasOwnProperty) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key])
      } else {
        clone[key] = obj[key]
      }
    }
  }
  return clone
}
