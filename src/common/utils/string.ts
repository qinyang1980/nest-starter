import * as utils from 'utility';

/**
 * @author andy.qin
 * @description 功能：根据当前时间和随机字符串产生唯一的订单ID
 * @returns {string} 唯一的订单ID
 */
export function genOrderUiqueId(): string {
  // tslint:disable-next-line:cyclomatic-complexity
  const d = new Date();
  let date: any = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  let month: any = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let hours: any = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  let mintues: any = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  let seconds: any = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  let milliseconds: any = d.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }
  return d.getFullYear() + month + date +
    hours + mintues + seconds + milliseconds + utils.randomString(8, '1234567890');
}
