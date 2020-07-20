import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login, mobileLogin } from "@redux/actions/login";
import { reqGetverifyCode } from '@api/acl/oauth'
import "./index.less";

const { TabPane } = Tabs;


function LoginForm (props) {
  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [isTime, setIsTime] = useState(5)
  const [activeKey, setActiveKey] = useState('uesr')
  const [form] = Form.useForm()
  const onFinish = () => {
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        let { username, password } = res
        props.login(username, password).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    } else {
      form.validateFields(['phone', 'verify']).then(res => {
        let { phone, verify } = res
        props.mobileLogin(phone, verify).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    }
    // props.login(username, password).then((token) => {
    //   // 登录成功
    //   // console.log("登陆成功~");
    //   // 持久存储token
    //   localStorage.setItem("user_token", token);
    //   props.history.replace("/");
    // })
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });

  };
  const validator = (rule, value) => {
    // console.log(rule, value)
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject('必须填')
      }
      if (value.length < 4) {
        return reject('必须大于4个字符')
      }
      if (value.length > 10) {
        return reject('必须小于10字符')
      } if (!/^[0-9a-zA-Z]+$/.test(value)) {
        return reject('必须是数字，字母，下划线')
      }
      return resolve()
    })
  }
  const getVerifyCode = async () => {
    const res = await form.validateFields(['phone'])
    // console.log('成功', res)
    // await reqGetverifyCode(res.phone)
    setIsShowDownCount(true)
    let timeId = setInterval(() => {
      --isTime
      setIsTime(isTime)
      if (isTime <= 0) {
        setIsShowDownCount(false)
        clearInterval(timeId)
        setIsTime(5)
      }
    }, 1000)
  }
  const handleTabChange = activeKey => {
    // console.log(activeKey)
    setActiveKey(activeKey)
  }
  const gitLogin = () => {
    console.log(window.location)
    window.location.href = `https://github.com/login/oauth/authorize?client_id=26a49e33d7eb19199680`
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username"
              rules={[{ validator }]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[
                {
                  required: true,
                  message: '必须填'
                },
                {
                  min: 4,
                  message: '不能小于4字符'
                },
                {
                  max: 10,
                  message: '不能大于10字符'
                },
                {
                  pattern: /^[0-9a-zA-Z]+$/,
                  message: '必须是数字，字母，下划线'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '你输入的不是手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify"
                  rules={[
                    {
                      required: true,
                      message: '必须填'
                    },
                    {
                      pattern: /^[\d]{6}$/,
                      message: '请输入验证码'
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={getVerifyCode} disabled={isShowDownCount}>
                  {isShowDownCount ? `${isTime}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" onClick={gitLogin} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}

export default withRouter(
  connect(null, { login, mobileLogin })(LoginForm)
)