import React from 'react'
import { Route, Switch, NavLink, withRouter } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './components/users/Login'
import Register from './components/users/Register'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './app_animate.css'
import { connect } from 'react-redux'
import store from './store'

@withRouter
class App extends React.Component {

  constructor (props) {
    super(props)
    this.unlogin = this.unlogin.bind(this)
  }

  unlogin () {
    localStorage.removeItem('user_info')
    localStorage.removeItem('token')
    this.props.history.push({
      pathname: '/user/login'
    })
  }

  render () {
    const nickname = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).nickname : undefined
    return (
      <>
        <div className="Header_div">
          <h1 className="Header_title">Todo List</h1>
        </div>
        <div className='NavLink_bar'>
          <NavLink to={'/lists'}>列表</NavLink>
          {!nickname ? <NavLink to={'/user/register'}>注册</NavLink> : <></>}
          {!nickname ? <NavLink to={'/user/login'}>登录</NavLink> : <><h2>做点啥捏, {nickname}?</h2><a onClick={this.unlogin} href='javascript:;'>注销</a></>}
        </div>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition key={this.props.location.pathname} timeout={300} classNames="fade" unmountOnExit>
            <Switch>
              <Route path={"/lists"} component={Body}></Route>
              <Route path={"/user/login"} component={Login}></Route>
              <Route path={"/user/register"} component={Register} {...this.props}></Route>
              <Route path={"/"} component={Body}></Route>
            </Switch>
          </CSSTransition>
        </SwitchTransition>
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


export default connect(mapStateToProps, null)(App)