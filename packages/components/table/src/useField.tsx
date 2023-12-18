import React from 'react';
import { IFieldEntities, IError, ClassUseField } from './type.d';
import Schema from './async-validator';

export class FormStore {
  store: any;
  fieldEntities: IFieldEntities[] = [];
  fieldErrors: IError[] = [];

  constructor() {
    this.store = [];
    this.fieldEntities = [];
  }
  registerField = (index, config) => {
    this.fieldEntities[index] = this.fieldEntities[index] || {};
    this.fieldEntities[index][config.name] = config;
  };
  setFieldValues = (index, newStore) => {
    if (index === undefined) return;
    // 缓存当前编辑数据
    this.store[index] = { ...this.store[index], ...newStore };
  };
  setFieldValue = (index, name, value) => {
    if (index === undefined) return;
    if (name === undefined) return;
    this.store[index][name] = value;
  };
  getFieldValue = (index, name) => {
    if (index === undefined) return;
    // 获取 store中的某个属性名称的值
    return this.store[index][name];
  };
  getFieldValues = (index?) => {
    return index === undefined ? this.store : this.store[index];
  };

  setFieldError = (index, name, error) => {
    if (index === undefined) return;
    if (name === undefined) return;
    this.fieldErrors[index][name] = error;
  };
  setFieldErrors = (index, newErrors) => {
    if (index === undefined) return;
    this.fieldErrors[index] = newErrors;
  };
  getFieldErrors = (index) => {
    return index !== undefined ? this.fieldErrors[index] : this.fieldErrors;
  };
  getFieldError = (index, name) => {
    if (index === undefined) return;
    const errors = this.fieldErrors[index] || {};
    return name ? errors[name] : errors;
  };

  // 校验表单的值
  validator = (index, name) => {
    const values = this.getFieldValues();
    const getRules = (column) => {
      const rules: any = [];
      for (const key in column) {
        if (['required', 'min', 'max', 'validator'].includes(key)) {
          rules.push({ [key]: column[key] });
        }
      }
      return rules;
    };

    const rowInfo = this.fieldEntities[0];
    const keys = Object.keys(rowInfo);
    const descriptor = keys.reduce((descriptor, key) => {
      const entity = rowInfo[key];
      // [{required:true},{min:3},{max:6}]
      const rules = entity.column?.rules || getRules(entity.column);
      if (rules && rules.length > 0) {
        // {required:true,min:3,max:6}
        const config = rules.reduce((memo, rule) => {
          memo = { ...memo, ...rule };
          return memo;
        }, {});

        descriptor[entity.column.dataIndex] = {
          title: entity.column.title,
          rules: config,
          name: entity.column.dataIndex,
        };
      }
      return descriptor;
    }, {});

    const columns = keys.map((key) => rowInfo[key].column);
    const props: any[] = [];
    this.fieldEntities.map((row: any) => {
      const rowProps: any = [];
      Object.keys(row).forEach((key: string) => {
        rowProps.push(row[key].props);
      });
      props.push(rowProps);
    });
    return new Schema(descriptor, columns, props).validator(values, index, name).then((schema: any) => {
      this.fieldErrors = schema.errors;
      // 校验为异步进行，需要再次手动刷新组件
      this.fieldEntities.forEach((row) => {
        Object.keys(row).forEach((name) => {
          const { forceReRender } = row[name];
          // 直接更新，react会去做domDiff
          forceReRender && forceReRender();
        });
      });

      return schema;
    });
  };

  // 希望隐藏一些私有属性，想给别人用的才放到getForm
  getForm = (): ClassUseField => {
    return {
      setFieldValue: this.setFieldValue,
      setFieldValues: this.setFieldValues,
      getFieldValue: this.getFieldValue,
      getFieldValues: this.getFieldValues,

      setFieldError: this.setFieldError,
      setFieldErrors: this.setFieldErrors,
      getFieldError: this.getFieldError,
      getFieldErrors: this.getFieldErrors,

      validator: this.validator,
      registerField: this.registerField,
    };
  };
}

export const useField = () => {
  const formRef: { current: undefined | ClassUseField } = React.useRef();

  // 确保不会因为页面刷新生成新的实例
  if (!formRef.current) {
    const formStore = new FormStore();
    const formInstance = formStore.getForm();
    formRef.current = formInstance;
  }

  return formRef.current;
};

