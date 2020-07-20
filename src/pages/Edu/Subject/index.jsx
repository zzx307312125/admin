import React, { Component } from "react";
import { Button, Table, Tooltip, Input, message, Modal } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
// import { reqGetSubject } from '@api/edu/subject'
import { connect } from 'react-redux'
import { getSubjectList, getSecSubjectList, updateSubject } from './redux'
import { reqDelSubject } from '@api/edu/subject'
import './index.css'
const { confirm } = Modal;
// const data = [
//   {
//     key: 1,
//     name: '前端11',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: '后端',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: '大数据',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 4,
//     name: '运维',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 5,
//     name: 'c',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 6,
//     name: 'd',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 7,
//     name: 'e',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
// ];
@connect(state => ({ subjectList: state.subjectList }), { getSubjectList, getSecSubjectList, updateSubject })
class Subject extends Component {
  currentPage = 1 // 当前页数
  pageSize: 10 // 每页显示条数
  state = {
    subjectId: '',
    subjectTitle: ''
  }
  columns = [
    {
      title: '分类名称', key: 'title', render: value => {
        if (value._id === this.state.subjectId) {
          return (
            <Input value={this.state.subjectTitle} onChange={this.handleChange} className='subject-input' />
          )
        }
        return <span>{value.title}</span>

      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 200,
      render: value => {
        if (value._id === this.state.subjectId) {
          return <> <Button type="primary" onClick={this.handleUpdate}>确认</Button><Button type="danger" onClick={this.handleCancle}>取消</Button></>
        }
        return <> <Tooltip title='更新课程分类'><Button type="primary" onClick={this.handleUpdateClick(value)}><FormOutlined /></Button></Tooltip><Tooltip title='删除课程分类'><Button type="danger" onClick={this.handleDel(value)}><DeleteOutlined /></Button></Tooltip></>
      }

    },
  ];

  componentDidMount () {
    // this.getSubject(1, 10)
    // console.log(this.props)
    this.props.getSubjectList(1, 10)
  }
  // getSubject = async (page, pageSize) => {
  //   const result = await reqGetSubject(page, pageSize)
  //   // console.log(result)
  //   this.setState({
  //     subject: result,
  //   })
  // }
  handlePage = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  handleSize = (current, size) => {
    this.props.getSubjectList(current, size)
    this.currentPage = current
    this.pageSize = size
  }
  handleAdd = () => {
    this.props.history.push('/edu/subject/add')
  }
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }
  handleChange = e => {
    this.setState({
      subjectTitle: e.target.value.trim()
    })
  }
  handleUpdateClick = value => {
    return () => {
      console.log(value)
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })
      this.oldSubjectTitle = value.title
    }
  }
  // 取消按钮
  handleCancle = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  // 确认按钮
  handleUpdate = async () => {
    let { subjectTitle, subjectId } = this.state
    if (subjectTitle.length === 0) {
      message.error('课程分类名称不能为空')
      return
    }
    if (this.oldSubjectTitle === subjectTitle) {
      message.error('课程分类名称不能一样')
      return
    }
    await this.props.updateSubject(subjectTitle, subjectId)
    message.success('更改成功')
    this.handleCancle()
  }
  // 删除
  handleDel = value => () => {
    confirm({
      title: (<div>
        确定要删除<span style={{ color: 'red' }}>{value.title}</span>吗？
      </div>),
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await reqDelSubject(value._id)
        message.success('删除成功了')
        const totalPage = Math.ceil(
          this.props.subjectList.total / this.pageSize
        )
        if (this.currentPage !== 1 && this.props.subjectList.length === 1 && totalPage === this.currentPage) {
          this.props.getSubjectList(this.currentPage, this.pageSize)
          return
        }
        this.props.getSubjectList(this.currentPage, this.pageSize)
      },
    });
  }
  render () {
    return <div className="bg">
      <Button type="primary" icon={<PlusOutlined />} className="btn" onClick={this.handleAdd}>新建</Button>
      <Table
        columns={this.columns}
        expandable={{
          // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          // rowExpandable: record => record.name !== 'Not Expandable',
          onExpand: this.handleClickExpand
        }}
        dataSource={this.props.subjectList.items}
        rowKey='_id'
        pagination={{
          total: this.props.subjectList.total,
          current: this.currentPage,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          onChange: this.handlePage,
          onShowSizeChange: this.handleSize
        }}
      />,
    </div>;
  }
}
export default Subject
