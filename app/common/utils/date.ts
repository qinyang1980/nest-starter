/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype['Format'] = function (fmt: any): Date {
  const o = {
    'M+': this.getMonth() + 1,                 // 月份
    'd+': this.getDate(),                    // 日
    'h+': this.getHours(),                   // 小时
    'm+': this.getMinutes(),                 // 分
    's+': this.getSeconds(),                 // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()             // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return fmt;
};

export function dateToAge(birthday: string): string {
  if (birthday) {
    return ((new Date().getTime() - new Date(birthday).getTime()) / (1000 * 60 * 60 * 24 * 365) + 1).toFixed(0) + '岁';
  }
}

export function timeInterval(time: string | Date): string {
  if (time) {
    time = new Date(time);
    const now = new Date();
    const interval = now.getTime() - time.getTime();
    // tslint:disable-next-line
    return `${Math.floor(interval / (1000 * 60 * 60))}小时${Math.floor(interval / 1000 / 60 % 60)}分${Math.floor(interval / 1000 % 60)}秒`
  }
}

export function formatDate(utcString: string): string {
  if (!utcString) {
    return utcString;
  }

  const date = new Date(utcString) as any;
  return date.Format('yyyy-MM-dd');
}

export function formatTime(utcString: string): string {
  if (!utcString) {
    return utcString;
  }

  const date = new Date(utcString) as any;
  return date.Format('yyyy-MM-dd hh:mm:ss');
}

/**
 * 获取当天的开始时间
 */
export function nowDay(date: string): string {
  let now: string;
  if (date) {
    now = new Date(date).toString();
  } else {
    now = new Date().toString();
  }
  return formatTime(now).replace(/\s+.*/, ' 00:00:00');
}

/**
 * 获取本周的开始时间
 */
export function nowWeek(date: string): string {
  let now: Date;
  if (date) {
    now = new Date(date);
  } else {
    now = new Date();
  }
  const dayIndexofWeek = now.getDay();
  const beginOfWeek = now.getTime() - 24 * 60 * 60 * 1000 * dayIndexofWeek;
  return formatTime(new Date(beginOfWeek).toString()).replace(/\s+.*/, ' 00:00:00');
}

/**
 * 获取本月的开始时间
 */
export function nowMonth(date: string): string {
  let now: Date;
  if (date) {
    now = new Date(date);
  } else {
    now = new Date();
  }
  const dayIndexofMonth = now.getDate();
  const beginOfMonth = now.getTime() - 24 * 60 * 60 * 1000 * (dayIndexofMonth - 1);
  return formatTime(new Date(beginOfMonth).toString()).replace(/\s+.*/, ' 00:00:00');
}

/**
 * 当前时间减去8小时，转换成utc标准时间
 */
export function toUTC(date: Date): string {
  if (!date) {
    return null;
  }

  const unixTime = new Date(date).getTime() - 8 * 60 * 60 * 1000;
  const utcTime = new Date(unixTime).toString();
  return formatTime(utcTime);
}
