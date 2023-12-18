import { ReactNode } from 'react';
import { IColumn, IError } from './type.d';

class Schema {
  descriptor;
  columns: IColumn[];
  props: any[];
  errorFields: IError[] = [];
  constructor(descriptor, columns, props) {
    this.descriptor = descriptor;
    this.columns = columns;
    this.props = props;
  }
  async checker(record, index, code, validateDisabled, rowProps) {
    const errorInfo = {};

    for (const name in this.descriptor) {
      const value = record[name];
      const currentCellProps = rowProps.find((item) => item.name === name);
      // console.log(currentCellProps, '==currentCellProps==')

      // 如果有具体属性名，则其他属性跳过校验
      if (code && name !== code) {
        continue;
      }

      // 如果未开启disabled校验则disable状态跳过
      if (!validateDisabled && currentCellProps.elementProps.disabled) {
        continue;
      }

      const { rules } = this.descriptor[name];
      const tipName = this.descriptor[name].title || name;

      const ruleKeys = Object.keys(rules); // [required,min,max,validator]

      let errors: ReactNode[] = [];

      for (let i = 0; i < ruleKeys.length; i++) {
        const ruleKey = ruleKeys[i];
        if (ruleKey === 'required') {
          if (rules[ruleKey] && !value) {
            errors.push(`${tipName}是必填项`);
          }
        } else if (ruleKey === 'min') {
          if (value.length < rules[ruleKey]) {
            errors.push(`${tipName}最少是${rules[ruleKey]}个字符!`);
          }
        } else if (ruleKey === 'max') {
          if (value.length > rules[ruleKey]) {
            errors.push(`${tipName}最多是${rules[ruleKey]}个字符!`);
          }
        } else if (ruleKey === 'validator') {
          if (rules.required && !value) {
            // 若必填且无值，则不必校验
            continue;
          }
          const validator = rules[ruleKey];
          let validatorReault = validator(value, ruleKey, record);

          // 如果自定义校验器返回的是promise则获取promise结果
          const { then } = validatorReault;
          if (then && typeof then === 'function') {
            validatorReault = await validatorReault.then((res) => res);
          }
          // 返回不为 true 则认为自己定义校验不通过，默认将返回信息作为错误提示
          if (validatorReault !== true) {
            const message = this.columns.find((column) => column.dataIndex === name)?.message;
            errors.push(validatorReault || message || `${tipName}不符合自定义较验器的规则判断!`);
          }
        }

        // 非必填无值不报错
        if (!rules.required && !value) {
          errors = [];
        }
      }

      if (errors.length > 0) {
        errorInfo[name] = errors;
        if (index !== undefined) {
          this.errorFields[index] = errorInfo;
        } else {
          this.errorFields.push(errorInfo);
        }
      }
    }
  }
  validator(values, index?, name?) {
    return new Promise(async (resolve) => {
      const checker: any = [];

      values.forEach((record, idx) => {
        const rowProps = this.props[idx];
        // 是否开启全量校验
        const { validateAllRow } = rowProps[0];
        // 是否开启disabled校验
        const { validateDisabled } = rowProps[0];
        // 获取当前行的编辑状态
        const { __$isEdit } = rowProps[0];

        // 如果开启全量校验，则校验所有行
        if (validateAllRow) {
          checker.push(this.checker(record, idx, name, validateDisabled, rowProps));
        } else {
          // 如果有具体index，则只校验这一条数据
          if (index !== undefined) {
            if (idx === index) {
              checker.push(this.checker(record, idx, name, validateDisabled, rowProps));
            }
          } else {
            // 校验所有编辑行
            if (__$isEdit) {
              checker.push(this.checker(record, idx, name, validateDisabled, rowProps));
            }
          }
        }
      });

      await Promise.all(checker);
      console.log('---validator-result--', this.errorFields);

      const errors = this.errorFields;
      resolve({ errors, values });
    });
  }
}
export default Schema;
