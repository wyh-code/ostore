export type TComputType = "+" | '-' | '*' | '/';
export type TComputResult = {
    result: number;
    next: TComputFunction;
};
export type TComputFunction = (type: TComputType, ...args: number[]) => TComputResult;
export declare const compute: TComputFunction;
