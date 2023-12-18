/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 其他相关工具函数
 */

/**
 * 复制函数
 * @param text 需要复制的内容
 * @param callback 复制结束后的回调函数   
 */
interface ICopyCallbackProps {
  status: boolean; // 标识是否复制成功
  message?: string; // 失败原因
}
export const copy = (text: string, callback?: (result: ICopyCallbackProps) => void ) => {
  if (text) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.setSelectionRange(0, 99999);
    input.select();
    try {
      if (document.execCommand('Copy')) {
        document.execCommand('Copy');
        callback && callback({ status: true });
      } else {
        callback && callback({ status: true, message: "document.execCommand('Copy')不存在" });
      }
    } catch (err: any) {
      callback && callback({ status: true, message: err.message });
    }
    document.body.removeChild(input);
  }
};

/**
 * 指定dom元素全屏
 * @param id domId
 */
export const requestFullscreen = (id: string) => {
  const docElm = document.getElementById(id) as any;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  }
};
// 退出全屏
export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitCancelFullScreen) {
    (document as any).webkitCancelFullScreen();
  }
};

/**
 * 根据指定key的值，对对象数组进行去重
 * @param arr 需要去重的数组
 * @param key 指定key
 * @returns
 */
export function uniqueByKey(arr: any[], key:string) {
  const hash = {};
  const result = arr.reduce((total, currentValue: any) => {
    if (currentValue && typeof currentValue === 'object' && !hash[currentValue[key]]) {
      // 如果当前元素的key值没有在hash对象里，则可放入最终结果数组
      hash[currentValue[key]] = true; // 把当前元素key值添加到hash对象
      total.push(currentValue); // 把当前元素放入结果数组
    }
    return total; // 返回结果数组
  }, []);
  return result;
}

/**
 * 判断对象是否有空值
 * @param obj
 */
export function hasNullValue(obj: { [key:string]: any }) {
  let result = false;
  Object.values(obj)?.forEach((item) => {
    if (item === '' || item === null) {
      result = true;
    }
  });
  return result;
}

/**
 * 判断对象是否至少有一项值
 * @param obj
 */
export function hasNotNullValue(obj:{ [key:string]: any }) {
  let result = false;
  Object.values(obj)?.forEach((item) => {
    if (item !== '' && item !== null && item !== undefined) {
      result = true;
    }
  });
  return result;
}

/**
 * 递归获取指定class的祖先元素
 * @param dom 
 * @param classname 
 * @returns 
 */
type TGetParentNode = (dom: HTMLElement, classname: string) => ParentNode | null | undefined;
export const getParentNode:TGetParentNode = (dom: HTMLElement, classname: string) => {
  if (!dom) return;
  const parentNode:HTMLElement = dom.parentNode as HTMLElement;
  if (parentNode && classname) {
    if (Array.from(parentNode.classList).includes(classname)) {
      return parentNode;
    } else {
      return getParentNode(parentNode, classname);
    }
  }
  return parentNode;
};

/**
 * 获取数据类型
 * @param obj
 * @returns  TGetDataTypeReturn
 */
type TGetDataTypeFunction = (obj: any) => TGetDataTypeReturn;
type TGetDataTypeReturn = "array" |  "object" |  "number" | "string" | "null" | "undefined" | "function" | "date" | "regexp" | null;
export const getDataType: TGetDataTypeFunction = (obj:any) => {
  const s:string = Object.prototype.toString.call(obj);
  const result = s.match(/\[object (.*?)\]/);
  return result && result[1].toLowerCase() as TGetDataTypeReturn;
};