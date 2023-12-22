---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 资源
order: 4
toc: content
---

# 资源相关工具函数

## downloadFile

`从指定的URL下载文件，并为下载的文件命名为给定的文件名。`

<b>原理：</b>该函数通过获取给定`url`的文件，然后从响应中创建一个`Blob`。接着，它创建一个锚点（`<a>`）元素，将其`href`属性设置为代表`Blob`的 URL，并将`download`属性设置为提供的`label`。通过模拟点击这个锚点元素，用户的浏览器将启动下载过程。在触发下载后，临时对象`URL`会被撤销以释放内存。

使用示例:

```js
/**
 * @param url - 要下载文件的URL地址。
 * @param label - 下载文件时使用的文件名。
 * @returns 返回一个Promise对象，该对象解析为一个指示下载操作成功状态的对象。
 *          如果下载成功，对象将包含一个设置为`true`的`status`属性。
 *          如果下载失败，对象将包含一个设置为`false`的`status`属性和一个包含错误信息的`message`属性。
 */

import { downloadFile } from '@ostore/utils';

downloadFile('http://example.com/file.pdf', 'MyFile.pdf').then((result) => {
  if (result.status) {
    console.log('成功启动下载');
  } else {
    console.error('下载失败:', result.message);
  }
});
```
