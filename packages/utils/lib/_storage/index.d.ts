/**
 * 获取cookie
 * @param name 要取的key
 */
export type IGetCookiesFunction = (name?: string) => string | undefined | {
    [key: string]: any;
};
export declare const getCookies: IGetCookiesFunction;
