import axios from 'axios';
import React from 'react'
import { withRouter } from 'react-router-dom'
import style from './UserComp.module.css'
import { nanoid } from 'nanoid'

class Register extends React.Component {

  constructor (props) {
    super(props);
    this.handleRegist = this.handleRegist.bind(this)
  }
  
  handleRegist (e) {
    e.preventDefault()
    console.log(e.target)
    console.log(this.props)
    const fm = new FormData(e.target.parentElement)
    axios({
      method: 'POST',
      url: 'http://localhost:8080/user/regist',
      data: {
        userid: nanoid(),
        username: fm.get('username'),
        password: fm.get('password'),
        nickname: fm.get('nickname')
      }
    }).
    then(result => {
      console.log(result)
    })
  }

  render () {
    return (
      <>
        <form className={style.loginForm}>
          <label htmlFor="username">用户名</label>
          <input type="text" name='username' id='username'/>
          <label htmlFor="password">密码</label>
          <input type="password" name='password' id='password'/>
          <label htmlFor="repassword">确认密码</label>
          <input type="password" name='repassword' id='repassword'/>
          <label htmlFor="nickname">昵称</label>
          <input type="text" name='nickname' id='nickname'/>
          <button onClick={this.handleRegist} className='RegisterBtn'>注册</button>
        </form>
      </>
    )
  }
}
export default Register