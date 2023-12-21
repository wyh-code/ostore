/**
 * 下载文件
 * @param url 文件下载路径
 * @param label 下载文件名
 */
export type IDownloadFileFunction = (url: string, label: string) => Promise<IDownloadFileResult>;
export interface IDownloadFileResult {
    status: boolean;
    message?: string;
}
export declare const downloadFile: IDownloadFileFunction;
