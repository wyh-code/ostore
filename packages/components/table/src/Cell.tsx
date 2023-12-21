import React from 'react';
import { ICellProps } from './type.d';
import './index.less';
import { debounce } from '@ostore/utils';

// console.log(debounce, '--debounce-')
export default ({ column, record, index, editRow, field, validateDisabled, validateAllRow }: ICellProps) => {
  const [, forceUpdate] = React.useState({});
  const forceReRender = () => {
    // 校验结束后调用此方法可以让组件刷新
    forceUpdate({});
  };

  // 获取展示结点
  const ElementNode = column.cell ? column.cell(record[column.dataIndex], index, record) : record[column.dataIndex];
  const EditElementNode = column.editCell ? column.editCell(record[column.dataIndex], index, record) : record[column.dataIndex];
  let currentElementNode = ElementNode;

  // 是否编辑态
  const isEdit = editRow && editRow(record);
  if (isEdit) {
    // 编辑模式下，有些结点不需要编辑没有 editCell
    currentElementNode = (EditElementNode || ElementNode);
  }

  // 属性劫持
  const name = column.dataIndex;
  const getControlled = (childProps) => {
    const { setFieldValue } = field;
    return {
      ...childProps,
      onChange: (value: any, event: EventTarget|undefined) => {
        setFieldValue(index, name, value);
        // if (column.debounce) {
        //   debounce(field.validator(index, name), column.debounce);
        // } else {
        //   field.validator(index, name);
        // }
        // 执行原函数
        childProps.onChange && childProps.onChange(value, event);
      },
      // onBlur: (value, event) => {
      //   field.validator(index, name);

      //   // 执行原函数
      //   childProps.onBlur && childProps.onBlur(value, event);
      // },
    };
  };

  const elementProps = currentElementNode?.props || {};
  const CloneElement = currentElementNode?.type ? React.cloneElement(currentElementNode, getControlled(elementProps)) : currentElementNode;

  const errorMessage = field.getFieldError(index, name);


  // 注册节点
  const config = {
    name,
    column,
    forceReRender,
    props: {
      name,
      elementProps: elementProps || {},
      validateDisabled,
      validateAllRow,
      __$isEdit: isEdit,
      __$index: index,
    },
  };
  field.registerField(index, config);

  return (
    <td style={{ width: column.width }}>
      <div className={`ostore-table-cell-wrapper ostore-table-cell-message-wrapper`}>
        {CloneElement}
        {isEdit && errorMessage && (
          <span className="cell-message">{errorMessage[0]}</span>
        )}
      </div>
    </td>
  );
};
