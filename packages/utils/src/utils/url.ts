/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: url 相关工具函数
 */

/**
 * 获取url参数
 * @param key 指定key
 */
export function getUrlParams(key?: string){
  const url = new URL(window.location.href);
  const params = Object.fromEntries(new URLSearchParams(url.search))
  return key ? params[key] : params;
}

/**
 * 修改href
 * @param query 
 */
export const setSearchParams = (query: {[key:string]: any}) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  for(let key in query){
    params.set(key, query[key]);
  }
  url.search = params.toString();
  history.pushState({ url: url.href, title: document.title }, document.title, url.href);
};

/*
 * 组装url参数
 */
type TPackUrlParamsFunction = (patams: {[key: string]: any}) => string;
export const packUrlParams:TPackUrlParamsFunction = (params = {}) => {
  let query = '';
  for (const key in params) {
    query += `${key}=${params[key]}&`;
  }
  return query.slice(0, -1);
};
