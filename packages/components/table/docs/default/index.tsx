import React from 'react';
import Table, { IColumn } from '@ostore/table';

export default () => {
  const columns:IColumn[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      cell: (value, index, record) => <div>{value}</div>
    },
    {
      title: '年龄',
      dataIndex: 'age',
      cell: (value, index, record) => <div>{value}</div>
    },
    {
      title: '电话',
      dataIndex: 'tel'
    }
  ]

  const dataSource = [
    {
      name: '张三',
      age: 18,
      tel: '13789899898'
    },
    {
      name: '李四',
      age: 18,
      tel: '13789899898'
    },
    {
      name: '王五',
      age: 18,
      tel: '13789899898'
    }
  ]

  return <Table columns={columns} dataSource={dataSource} />
}
