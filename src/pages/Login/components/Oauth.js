import React, { Component } from 'react'
import { connect } from "react-redux";
import { loginSuccessSync } from "@redux/actions/login";
@connect(null, { loginSuccessSync })
class Oauth extends Component {
  componentDidMount () {
    console.log(this.props)
    const token = this.props.location.search.split('=')[1]
    this.props.loginSuccessSync({ token })
    localStorage.setItem('user_token', token)
    this.props.history.replace('/')
  }
  render () {
    return (
      <div>
        权限验证中。。。
      </div>
    )
  }
}
export default Oauth
