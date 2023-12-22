---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 时间
order: 7
toc: content
---

# DOM 相关工具函数

## getParentNode

`根据给定的类名递归地向上查找并返回一个DOM元素的父节点。`

`getParentNode`函数接收两个参数：一个`HTMLElement`对象`dom`和一个字符串`classname`。函数从`dom`开始向上遍历 DOM 树，寻找具有指定类名的父节点。如果当前节点的父节点拥有该类名，则返回该父节点；如果没有，则继续向上递归在祖先节点中查找。

<b>注意事项：</b>

- 如果`dom`是`null`或者`classname`为空字符串，函数会直接返回 undefined。
- 如果`dom`是最顶层节点或者没有任何父节点具有指定的类名，则函数最终返回 undefined。
- 此函数不会修改传入的 DOM 元素。

使用示例：

```js
/**
 * @param dom - 待查找的初始DOM元素。
 * @param classname - 用于匹配父节点的类名。
 * @returns 如果找到具有指定类名的父节点，则返回该节点；如果未找到或参数无效，则返回undefined。
 */

import { getParentNode } from '@ostore/utils';

// 假设HTML结构如下：
// <div class="ancestor">
//   <div class="parent">
//     <div class="child"></div>
//   </div>
// </div>
const childNode = document.querySelector('.child');
const parentWithClass = getParentNode(childNode, 'ancestor');

if (parentWithClass) {
  console.log('找到具有指定类的父节点:', parentWithClass);
} else {
  console.log('未找到具有指定类的父节点');
}
```
