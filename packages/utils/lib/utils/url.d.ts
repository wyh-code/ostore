/**
 * 获取url参数
 * @param key 指定key
 */
export declare function getUrlParams(key?: string): string | {
    [k: string]: string;
};
/**
 * 修改href
 * @param query
 */
export declare const setSearchParams: (query: {
    [key: string]: any;
}) => void;
type TPackUrlParamsFunction = (patams: {
    [key: string]: any;
}) => string;
export declare const packUrlParams: TPackUrlParamsFunction;
export {};
