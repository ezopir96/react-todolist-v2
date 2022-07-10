import React from 'react'
import style from './UserComp.module.css'
import { LOG_USER_TYPE } from '../../store/module/user/type'
import { connect } from 'react-redux'
import axios from 'axios'
import localStorage from 'localStorage'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (e) {
    e.preventDefault()
    const fm = new FormData(e.target.parentElement)
    console.log(fm.get('password'))
    axios({
      method: 'POST',
      url: `http://localhost:8080/user/login`,
      data: {
        username: fm.get('username'),
        password: fm.get('password'),
      }
    })
    .then((result, err) => {
      const userInfo = { userid: result.data.userid, nickname: result.data.nickname }

      // 存储到本地存储 🐋🐋🐋
      localStorage.setItem('user_info', JSON.stringify(userInfo))
      localStorage.setItem('todo_token', result.data.token)

      // 存储到 redux 状态中 🐋🐋🐋
      console.log(userInfo)
      this.props.login(userInfo)
      this.props.history.push({
        pathname: '/lists'
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    // console.log(this.props)
    return (
      <>
        <form className={style.loginForm}>
          <label htmlFor="username">用户名</label>
          <input type="text" name='username' id='username' />
          <label htmlFor="password">密码</label>
          <input type="password" name='password' id='password' />
          <button onClick={ this.login } className='loginBtn'>登录</button>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: {
      userid: state.user.userInfo.userid,
      nickname: state.user.userInfo.nickname
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login (logInfo) {
      dispatch({ type: LOG_USER_TYPE, payload: logInfo })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)