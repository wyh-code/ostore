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
export type IGetCookiesFunction = (name?: string) => string | undefined | { [key: string]: any };
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

/**
 * 用于将指定的键值对存储到浏览器的localStorage中
 * @param key 用于存储数据项的键名
 * @param value 需要存储到localStorage中的数据值
 * @param options 一个包含缓存选项的对象
 */
interface CacheItem {
  data: any;
  options?: IOptions;
}
interface IOptions {
  endTime?: number; // 最后截止时间
  expiry?: number, // 过期时间，基于当前时间
  permissions?: string[]
}
export function setLocalStorage(key: string, value: any, options?: IOptions): any {
  let err;
  try {
    // 获取当前时间
    const currentTime = Date.now();
    // 设置过期时间
    let expiry = options?.expiry;
    if (expiry) {
      expiry += currentTime;
    }
    const item: CacheItem = {
      data: value,
      options,
    };
    localStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到localStorage
  } catch (error) {
    err = error;
  }

  return err;
}

/**
 * 用于获取localStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions 
 * @returns 
 */
export function getLocalStorage(key: string, userPermissions?: string[]): any {
  const itemStr = localStorage.getItem(key);
  if (itemStr) {
    try {
      const item: CacheItem = JSON.parse(itemStr);
      const currentTime = Date.now();

      // 检查是否设置了截止时间并且是否已过期
      if (item.options?.endTime && currentTime > item.options.endTime) {
        localStorage.removeItem(key);
        return null;
      }

      // 检查基于当前时间的过期时间
      if (item.options?.expiry && currentTime > item.options.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      // 检查用户是否有权访问缓存数据
      if (item.options?.permissions) {
        if(!userPermissions || !userPermissions.length){
          return null;
        }
        const hasPermission = item.options.permissions.some(permission => userPermissions.includes(permission));
        if (!hasPermission) {
          console.error('Access denied: User does not have the required permissions.');
          return null;
        }
      }

      return item.data; // 返回未过期且具有权限的数据
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  }
  return null;
}

/**
 * 用于将指定的键值对存储到浏览器的 sessionStorage
 * @param key 
 * @param value 
 * @param options 
 * @returns 
 */
export function setSessionStorage(key: string, value: any, options?: IOptions): any {
  let err;
  try {
    // 获取当前时间
    const currentTime = Date.now();
    // 设置过期时间
    let expiry = options?.expiry;
    if (expiry) {
      expiry += currentTime;
    }
    const item: CacheItem = {
      data: value,
      options,
    };
    sessionStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到 sessionStorage
  } catch (error) {
    err = error;
  }

  return err;
}

/**
 * 用于获取sessionStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions 
 * @returns 
 */
export function getSessionStorage(key: string, userPermissions?: string[]): any {
  const itemStr = sessionStorage.getItem(key);
  if (itemStr) {
    try {
      const item: CacheItem = JSON.parse(itemStr);
      const currentTime = Date.now();

      // 检查是否设置了截止时间并且是否已过期
      if (item.options?.endTime && currentTime > item.options.endTime) {
        sessionStorage.removeItem(key);
        return null;
      }

      // 检查基于当前时间的过期时间
      if (item.options?.expiry && currentTime > item.options.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }

      // 检查用户是否有权访问缓存数据
      if (item.options?.permissions) {
        if(!userPermissions || !userPermissions.length){
          return null;
        }
        const hasPermission = item.options.permissions.some(permission => userPermissions.includes(permission));
        if (!hasPermission) {
          console.error('Access denied: User does not have the required permissions.');
          return null;
        }
      }

      return item.data; // 返回未过期且具有权限的数据
    } catch (error) {
      console.error('Error parsing sessionStorage item:', error);
      return null;
    }
  }
  return null;
}
