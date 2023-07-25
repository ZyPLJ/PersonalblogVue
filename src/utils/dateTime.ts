/**
 * 将后端返回的时间字符串转换为指定格式的字符串
 * @param {string} timeStr - 后端返回的时间字符串
 * @param {string} format - 要输出的时间格式，例如 'yyyy-MM-dd HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(timeStr: string, format: string): string {
  const date = new Date(timeStr); // 将时间字符串转换为Date对象
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());
  const millisecond = padZero(date.getMilliseconds(), 3);
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString())
    .replace('dd', day.toString())
    .replace('HH', hour.toString())
    .replace('mm', minute.toString())
    .replace('ss', second.toString())
    .replace('SSS', millisecond.toString());
}

/**
 * 在数字前补0，使其达到指定的位数
 * @param {number} num - 要补0的数字
 * @param {number} length - 补0后要达到的位数
 * @returns {string} 补0后的字符串
 */
function padZero(num: number, length = 2): string {
  let str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

export default formatTime;
