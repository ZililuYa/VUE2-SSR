export function demo (firs, last) {
  return firs * last
}

export function isHistory (pathname) {
  const hsPathName = window.location.pathname
  return hsPathName === pathname || hsPathName === pathname + '/'
}

export function getUserMenu (status, routePath) {
  let array = []
  if (status.code === 200) {
    const menus = status.data.menu
    for (let item of menus) {
      if (routePath.includes(item.path)) {
        array = item.child
      }
    }
  }
  return array
}

export function getUserPowerMenu (status, routePath, path) {
  let array = []
  if (status.code === 200) {
    const menus = status.data.menu
    for (let item of menus) {
      if (routePath.includes(item.path)) {
        for (let key of item.child) {
          if (key.url.includes(path)) {
            array = key.child
          }
        }
      }
    }
  }
  return array
}

export function getPermission (obj) {
  let arr = []
  for (let item of obj) {
    arr.push(item.permission)
  }
  return arr
}

export function deepCopy (source) {
  let result
  if (typeof source === 'object' && !isNaN(source && source.length)) result = []
  else result = {}
  for (var key in source) {
    if (typeof source[key] === 'object') {
      // 如果属性为object类型，则递归调用深拷贝函数
      result[key] = deepCopy(source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}
