/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 文件操作相关工具函数
 */

/**
 * 下载文件
 * @param url 文件下载路径
 * @param label 下载文件名
 * @returns 返回一个Promise对象，该对象解析为一个指示下载操作成功状态的对象
 */
export type IDownloadFileFunction = (url: string, label: string) => Promise<IDownloadFileResult>;
export interface IDownloadFileResult {
  status: boolean; // 下载状态
  message?: string; // 错误信息
}
export const downloadFile: IDownloadFileFunction = (url: string, label: string) => {
  return fetch(url)
    .then((response) => response.blob())
    .then((blobResponse) => {
      const blob = new Blob([blobResponse]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
      return {
        status: true
      }
    })
    .catch(err => {
      return {
        status: false,
        message: err.message
      }
    });
}
