'use client'

/**
 * 将 ISO 8601 日期字符串转换为用户所在区域习惯的日期格式
 * @param {string} isoString - ISO 8601 格式的日期字符串
 * @returns {string} - 用户所在区域习惯的日期格式
 */
export function formatToUserLocale(isoString: string) {
  // 解析时间字符串为 Date 对象
  const date = new Date(isoString)

  // 获取用户所在区域的语言设置
  const userLocale =
    typeof window !== 'undefined' ? window.navigator.language : 'en-US'

  // 使用 Intl.DateTimeFormat 格式化 Date 对象
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // timeZoneName: 'short' // 可选: 显示时区信息
  }

  return new Intl.DateTimeFormat(userLocale, options).format(date)
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toMillionWithCommas(value: number | string) {
  const parts = (Number(value) / 1000000).toFixed(2).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.') + ' M'
}
