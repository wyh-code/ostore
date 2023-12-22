---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 缓存
order: 3
toc: content
---

# 缓存相关工具函数

## getCookies

`获取当前页面的cookie值。`

<b>原理：</b>`getCookies`函数首先获取`document.cookie`字符串，并以`;`为分隔符将其分割成数组。然后遍历数组，对每个 cookie 字符串进行进一步分割以获取 cookie 名称和值，最终累积成一个 cookie 对象。如果调用时传入了`name`参数，则返回该名称对应的 cookie 值；如果没有传入`name`参数，则返回包含所有 cookie 的对象。

<b>`请注意，此函数只能获取非HttpOnly的cookie。`</b>

<b>注意事项:</b>

- 如果 cookie 名不存在，返回`undefined`。
- 如果没有提供`name`且当前页面没有 cookie，返回的对象将为空。

使用示例:

```js
/**
 * @param name - 可选参数。指定要获取的cookie名称。
 * @returns 如果提供了`name`参数，则返回与该名称对应的cookie值。
 *          如果没有提供`name`，则返回一个包含所有cookie的对象，对象的键为cookie名称，值为cookie值。
 */

import { getCookies } from '@ostore/utils';

// 获取所有cookie
const allCookies = getCookies(); // console.log(allCookies);
// 获取名为"user"的cookie值
const userCookie = getCookies('user'); // console.log(userCookie);
```
