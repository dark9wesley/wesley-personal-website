export function convertStringToJSON(str: string) {
  if (!str) {
    return {}
  }
  // 使用正则表达式去除空格和换行符
  try {
    return JSON.parse(str.replace(/\s/g, ''))
  } catch (error) {
    console.warn('无效JSON', str)
    return {}
  }
}

// 检查是否外链
export function checkStartWithHttp(str: string) {
  // 检查字符串是否包含http
  if (str?.indexOf('http:') === 0 || str?.indexOf('https:') === 0) {
    // 如果包含，找到http的位置
    return true
  } else {
    // 不包含
    return false
  }
}

export function convertUrlStartWithOneSlash(str: string) {
  if (!str) {
    return '#'
  }
  // 判断url是否以 / 开头
  if (!str.startsWith('/')) {
    // 如果不是，则在前面拼接一个 /
    str = '/' + str
  }
  // 移除开头的多个连续斜杠，只保留一个
  str = str.replace(/\/+/g, '/')
  return str
}

