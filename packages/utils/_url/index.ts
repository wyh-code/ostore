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
export type TGetUrlParamsFunction = (key?: string) => undefined | string | { [key: string]: string };
export const getUrlParams:TGetUrlParamsFunction = (key?: string) => {
  const url = new URL(window.location.href);
  const params = Object.fromEntries(new URLSearchParams(url.search))
  return key ? params[key] : params;
}

/**
 * 修改href
 * @param query 
 */
export type TSetSearchParamsFunction = (query: {[key:string]: any}) => void;
export const setSearchParams: TSetSearchParamsFunction = (query: {[key:string]: any}) => {
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
export type TPackUrlParamsFunction = (patams: {[key: string]: any}) => string;
export const packUrlParams:TPackUrlParamsFunction = (params = {}) => {
  let query = '';
  for (const key in params) {
    query += `${key}=${params[key]}&`;
  }
  return query.slice(0, -1);
};


/**
 * 将base64转换为字符串中的原始二进制数据
 * @param dataURI base64
 * @returns 
 */
export type TDataURItoBlobFunction = (dataURI: string) => Blob;
export const dataURItoBlob:TDataURItoBlobFunction = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
};