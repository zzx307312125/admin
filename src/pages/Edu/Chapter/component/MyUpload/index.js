import React, { Component } from 'react'
import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { reqGetQiniuToken } from '@api/edu/lesson'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {
  constructor() {
    super()
    const str = localStorage.getItem('upload_Token')
    if (str) {
      const res = JSON.parse(str)
      // console.log(res)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
    } else {
      this.state = {
        expires: 0,
        uploadToken: ''
      }
    }
  }
  handleBeforeUpload = (file, fileList) => {
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频太大,不能超过20m')
        reject('视频太大,不能超过20m')
        return
      }
      if (Date.now() > this.state.expires) {
        const { uploadToken, expires } = await reqGetQiniuToken()
        this.saveUploadToken(uploadToken, expires)
      }
      resolve(file)
    })
  }
  saveUploadToken = (uploadToken, expires) => {
    const targetTime = Date.now() + expires * 1000 - 2 * 60 * 1000
    expires = targetTime
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('upload_Token', upload_token)
    this.setState({
      uploadToken,
      expires
    })
  }
  handleCustomRequest = value => {
    const file = value.file
    const key = nanoid(10)
    const token = this.state.uploadToken

    const putExtra = {
      mimeType: 'video/*'
    }
    const config = {
      region: qiniu.region.z2
    }
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const observer = {
      next (res) {
        console.log(res)

        value.onProgress(res.total)
      },
      error (err) {
        // console.log(err)

        value.onError(err)
      },
      complete: res => {
        // console.log(res)
        // 上传成功会调用. 展示一个上传成功的样式
        value.onSuccess(res)
        // 注意:解决视频上传成功,表单验证不通过的问题
        // 手动调用Form.Item传过来onChange方法,onChange方法中传入需要表单控制的数据
        // 未来要给本地服务器存储的实际上就是 上传视频成功的地址
        // 地址: 自己七牛云空间的域名 + 文件名
        this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/' + res.key)

        // console.log()
      }
    }
    this.subscription = observable.subscribe(observer) // 上传开始
  }
  componentWillUnmount () {
    // console.log(this)
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }
  render () {
    return (
      <Upload
        beforeUpload={this.handleBeforeUpload}
        customRequest={this.handleCustomRequest}
        accept='video/*'
      >
        <Button>
          <UploadOutlined /> 上传视频
        </Button>
      </Upload>
    )
  }
}
