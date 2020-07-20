import React, { Component } from 'react'
import { Card, Form, Button, Input, Switch, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { reqAddLesson } from '@api/edu/lesson'
import MyUpload from '../MyUpload'
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

class AddLesson extends Component {

  onFinish = async value => {
    const chapterId = this.props.location.state._id
    const data = {
      ...value,
      chapterId
    }
    await reqAddLesson(data)
    message.success('课时添加成功')
    this.props.history.push('/edu/chapter/list')
  }
  render () {

    return (
      <div>
        <Card title={
          <>
            <Link to='/edu/chapter/list'> <ArrowLeftOutlined /></Link>
            <span className='add-lesson'>新增课时</span>
          </>
        }>
          <Form
            // 给表单中的表单项布局
            {...layout}
            name='lesson'
            // 当点击表单内的提交按钮,onFinish会触发
            onFinish={this.onFinish}
            // 提交失败的时候会触发
            // onFinishFailed={onFinishFailed}
            initialValues={{
              title: '嘤嘤嘤',
              free: true
            }}
          >
            {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
            <Form.Item
              // 表示提示文字
              label='课时名称'
              // 表单项提交时的属性
              name='title'
              // 校验规则
              rules={[
                {
                  required: true,
                  // 校验不通过时的提示文字
                  message: '请输入课时名称!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='是否免费'
              name='free'
              rules={[
                {
                  required: true,
                  message: '请选择是否免费'
                }
              ]}
              valuePropName='checked'
            >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </Form.Item>
            <Form.Item
              // 表示提示文字
              label='上传视频'
              // 表单项提交时的属性
              name='video'
              // 校验规则
              rules={[
                {
                  required: true,
                  // 校验不通过时的提示文字
                  message: '请输入上传视频!'
                }
              ]}
            >
              <MyUpload></MyUpload>
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
export default AddLesson
