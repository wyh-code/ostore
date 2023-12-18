/**
 * 复制函数
 * @param text 需要复制的内容
 * @param callback 复制结束后的回调函数
 */
interface ICopyCallbackProps {
    status: boolean;
    message?: string;
}
export declare const copy: (text: string, callback?: ((result: ICopyCallbackProps) => void) | undefined) => void;
/**
 * 指定dom元素全屏
 * @param id domId
 */
export declare const requestFullscreen: (id: string) => void;
export declare const exitFullScreen: () => void;
/**
 * 根据指定key的值，对对象数组进行去重
 * @param arr 需要去重的数组
 * @param key 指定key
 * @returns
 */
export declare function uniqueByKey(arr: any[], key: string): any;
/**
 * 判断对象是否有空值
 * @param obj
 */
export declare function hasNullValue(obj: {
    [key: string]: any;
}): boolean;
/**
 * 判断对象是否至少有一项值
 * @param obj
 */
export declare function hasNotNullValue(obj: {
    [key: string]: any;
}): boolean;
/**
 * 递归获取指定class的祖先元素
 * @param dom
 * @param classname
 * @returns
 */
type TGetParentNode = (dom: HTMLElement, classname: string) => ParentNode | null | undefined;
export declare const getParentNode: TGetParentNode;
/**
 * 获取数据类型
 * @param obj
 * @returns  TGetDataTypeReturn
 */
type TGetDataTypeFunction = (obj: any) => TGetDataTypeReturn;
type TGetDataTypeReturn = "array" | "object" | "number" | "string" | "null" | "undefined" | "function" | "date" | "regexp" | null;
export declare const getDataType: TGetDataTypeFunction;
export {};
