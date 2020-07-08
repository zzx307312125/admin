import React, { Component } from "react";
import { Button, Table } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.css'
const columns = [
  { title: '分类名称', dataIndex: 'name', key: 'key' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: 200,
    render: () => <> <Button type="primary"><FormOutlined /></Button><Button type="danger" ><DeleteOutlined /></Button></>,
  },
];
const data = [
  {
    key: 1,
    name: '前端11',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: '后端',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 3,
    name: '大数据',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 4,
    name: '运维',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 5,
    name: 'c',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 6,
    name: 'd',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 7,
    name: 'e',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
];
export default class Subject extends Component {
  render () {
    return <div className="bg">
      <Button type="primary" icon={<PlusOutlined />} className="btn">新建</Button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}

      />,
    </div>;
  }
}
