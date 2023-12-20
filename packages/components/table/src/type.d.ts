import { ReactNode } from "react";

export const TYPE = 'TYPE';

export type EditRow = (item: any) => boolean;
export type MoveRow = (dragIndex: number, hoverIndex: number) => void;

export interface IRules {
  min?: number;
  max?: number;
  required?: boolean;
  validator?: (value: string, index: number, record: any) => ReactNode | undefined;
}
export interface IColumn extends IRules {
  dataIndex: string;
  title?: ReactNode;
  width?: number;
  required?: boolean;
  // 校验规则，存在时column中 IRules 包含的属性会失效
  rules?: IRules[];
  // 校验失败提示消息
  message?: ReactNode;
  // 校验器是否防抖处理
  debounce?: number;
  // 校验器
  validator?: (value: string, index: number, record: any) => boolean | ReactNode;
  // 默认渲染函数
  cell?: (value: string, index: number, record: any) => ReactNode;
  // 编辑态渲染函数
  editCell?: (value: string, index: number, record: any) => ReactNode;
}

export interface IEditTableBaseProps {
  // 表头
  columns: IColumn[];
  // 可编辑时需传入，覆盖默认field
  field: ClassUseField;
  // 返回可以编辑的行
  editRow?: EditRow;
  // 存在则开启拖拽
  moveRow?: MoveRow;
  // 编辑行中disabled状态是否需要校验，默认false
  validateDisabled?: boolean;
  // 是否校验所有行，默认false，只校验编辑行
  validateAllRow?: boolean;
  // 没有自定义提示信息时，是否使用 title 作为提示信息
  useTitleForErrorMessage?: boolean;
}
export interface IEditTableProps extends IEditTableBaseProps {
  dataSource: any[];
  // 是否开启loading
  loading?: boolean;
  // 空状态
  empty?: ReactNode;
}


export interface IRowProps extends IEditTableBaseProps {
  record: any;
  index: number;
}

export interface ICellProps {
  column: IColumn;
  validateDisabled?: boolean;
  validateAllRow?: boolean;
  record: any;
  index: number;
  editRow: EditRow | undefined;
  field: ClassUseField;
}

export interface IForceRootRender {
  forceRootRender(): void;
}

export interface IFieldEntities {
  column: IColumn;
  props: any;
  forceReRender?: () => any;
}

export interface IRegisterConfig {
  column: IColumn, 
  forceReRender?: () => any, 
  props?: any,
}
export class ClassUseField {
  setFieldValue: (index:number, name: string, value: any) => void;
  setFieldValues: (index:number, values:any) => void;
  getFieldValue: (index:number, name: string) => any;
  getFieldValues: (index?:number) => any;

  setFieldError: (index:number, name: string, value: any) => void;
  setFieldErrors: (index:number, errors: any) => void;
  getFieldError: (index:number, name?: string) => any;
  getFieldErrors: (index?: number) => any;
 
  validator: (index?:number, name?: string) => any;
  registerField: (index, config: any) => any;
}

export interface IError {
  [key: string]: ReactNode[]
}
