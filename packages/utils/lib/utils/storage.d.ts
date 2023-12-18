/**
 * 获取cookie
 * @param name 要取的key
 */
type IGetCookiesFunction = (name?: string) => string | undefined | {
    [key: string]: any;
};
export declare const getCookies: IGetCookiesFunction;
export {};
