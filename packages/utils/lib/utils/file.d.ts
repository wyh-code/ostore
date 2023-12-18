/**
 * 下载文件
 * @param url 文件下载路径
 * @param label 下载文件名
 */
type IDownloadFileFunction = (url: string, label: string) => Promise<IDownloadFileResult>;
interface IDownloadFileResult {
    status: boolean;
    message?: string;
}
export declare const downloadFile: IDownloadFileFunction;
/**
 * 将base64转换为字符串中的原始二进制数据
 * @param dataURI base64
 * @returns
 */
type TDataURItoBlobFunction = (dataURI: string) => Blob;
export declare const dataURItoBlob: TDataURItoBlobFunction;
export {};
