/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: dom操作相关工具函数
 */

/**
 * 递归获取指定class的祖先元素
 * @param dom 
 * @param classname 
 * @returns 
 */
export type TGetParentNode = (dom: HTMLElement, classname: string) => ParentNode | null | undefined;
export const getParentNode: TGetParentNode = (dom: HTMLElement, classname: string) => {
  if (!dom) return;
  const parentNode: HTMLElement = dom.parentNode as HTMLElement;
  if (parentNode && classname) {
    if (Array.from(parentNode.classList).includes(classname)) {
      return parentNode;
    } else {
      return getParentNode(parentNode, classname);
    }
  }
  return parentNode;
};