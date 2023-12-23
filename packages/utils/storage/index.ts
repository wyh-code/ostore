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
export type IGetCookiesFunction = (name?: string) => string | undefined | {[key: string]: any};
export const getCookies: IGetCookiesFunction = (name?: string) => {
  // 分割`document.cookie`字符串，并将其转换为cookie对象
  let obj = document.cookie.split(';').reduce<{ [key: string]: string }>((map, str) => {
    // 获取每一对cookie名称和值
    map[str.split('=')[0].trim()] = str.split('=')[1].trim()
    return map
  }, {})
  // 如果提供了cookie名，返回对应的值；否则返回整个cookie对象
  return name ? obj[name] : obj;
};
