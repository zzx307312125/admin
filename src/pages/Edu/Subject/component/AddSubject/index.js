import React, { Component } from 'react'
import { Card, Form, Button, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { getSubjectList } from '../../redux'
import { reqGetSubject, reqAddSubject } from '@api/edu/subject'
import './index.css'
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
const Option = Select.Option
// @connect(state => ({ subjectList: state.subjectList }), { getSubjectList })
class AddSubject extends Component {
  page = 1
  state = {
    subjectList: {
      total: 0,
      items: []
    }
  }
  async componentDidMount () {
    // this.props.getSubjectList(1, 10)
    // console.log(this.props)
    const res = await reqGetSubject(this.page++, 10)
    this.setState({
      subjectList: res
    })
  }
  handleloadMore = async () => {
    const res = await reqGetSubject(this.page++, 10)
    const newItems = [...this.state.subjectList.items, ...res.items]
    this.setState({
      subjectList: {
        total: res.total,
        items: newItems
      }
    })
  }
  onFinish = async value => {
    console.log(value)
    try {
      await reqAddSubject(value.subjectname, value.parentid)
      message.success('课程分类添加成功')
      this.props.history.push('/edu/subject/list')
    } catch{
      message.error('课程分类添加失败')
    }
  }
  render () {

    return (
      <div>
        <Card title={
          <>
            <Link to='/edu/subject/list'> <ArrowLeftOutlined /></Link>
            <span className='add-subject'>新增课程</span>
          </>
        }>
          <Form
            // 给表单中的表单项布局
            {...layout}
            name='subject'
            // 当点击表单内的提交按钮,onFinish会触发
            onFinish={this.onFinish}
          // 提交失败的时候会触发
          // onFinishFailed={onFinishFailed}
          >
            {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
            <Form.Item
              // 表示提示文字
              label='课程分类名称'
              // 表单项提交时的属性
              name='subjectname'
              // 校验规则
              rules={[
                {
                  required: true,
                  // 校验不通过时的提示文字
                  message: '请输入课程分类!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='父级分类id'
              name='parentid'
              rules={[
                {
                  required: true,
                  message: '请选择分类id'
                }
              ]}
            >
              <Select
                dropdownRender={menu => {
                  return (
                    <>
                      {menu}
                      {this.state.subjectList.total > this.state.subjectList.items.length && (<Button type='link' onClick={this.handleloadMore}>加载更多数据</Button>)}

                    </>
                  )
                }}
              >
                {/* 一级课程分类 这一项不在获取的动态数据中,所以在这里写死*/}
                <Option value={0} key={0}>
                  {'一级课程分类'}
                </Option>
                {this.state.subjectList.items.map(item => {
                  return (<Option value={item._id} key={item._id}>{item.title}</Option>)
                })}
                {/* 根据拿到一级课程分类,动态渲染 */}
              </Select>

            </Form.Item>

            <Form.Item>
              {/* htmlType表示这个按钮是表单内的提交按钮 */}
              <Button type='primary' htmlType='submit'>
                添加
            </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default AddSubject
