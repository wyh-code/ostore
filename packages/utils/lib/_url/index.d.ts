/**
 * 获取url参数
 * @param key 指定key
 */
export type TGetUrlParamsFunction = (key?: string) => undefined | string | {
    [key: string]: string;
};
export declare const getUrlParams: TGetUrlParamsFunction;
/**
 * 修改href
 * @param query
 */
export type TSetSearchParamsFunction = (query: {
    [key: string]: any;
}) => void;
export declare const setSearchParams: TSetSearchParamsFunction;
export type TPackUrlParamsFunction = (patams: {
    [key: string]: any;
}) => string;
export declare const packUrlParams: TPackUrlParamsFunction;
/**
 * 将base64转换为字符串中的原始二进制数据
 * @param dataURI base64
 * @returns
 */
export type TDataURItoBlobFunction = (dataURI: string) => Blob;
export declare const dataURItoBlob: TDataURItoBlobFunction;
