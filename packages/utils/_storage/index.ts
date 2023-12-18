/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: localStorage、cookie 相关工具函数
 */


/**
 * 获取cookie
 * @param name 要取的key
 */
type IGetCookiesFunction = (name?: string) => string | undefined | {[key: string]: any};
export const getCookies: IGetCookiesFunction = (name?: string) => {
  let obj = document.cookie.split(';').reduce((map, str) => {
    map[str.split('=')[0].trim()] = str.split('=')[1].trim()
    return map
  }, {})
  return name ? obj[name] : obj;
};
