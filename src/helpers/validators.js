// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === '')
    return true

  return (Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj) => {
  return obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
}
export const isToday = (date) => {
  const today = new Date()

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

