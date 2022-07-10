import Styled from 'styled-components'
import React from 'react'
import './List.css'
import CheckBox from '../components/CheckBox/CheckOne'
import DeleteBtn from './DeleteBtn'
import store from '../store'
import actions from '../store/module/todolist/actions'
import EventBus from '../utils/bus'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import localStorage from 'localStorage'

const TodoLi = Styled.li`
  height: 3.125rem;
  width: 29.75rem;
  background-color: #eee;
  list-style: none;
  display: flex;
  align-items: center;
`

const Contents = Styled.p`
  text-decoration: ${ props => 
    props.state ? 'line-through' : 'none'
  };
  color: ${ props => 
    props.state ? '#999' : ''
  };
`



class List extends React.Component {

  constructor (props) {
    super(props);
    this.handleChangeShow = this.handleChangeShow.bind(this)
  }

  state = {
    todos: store.getState().todolist.todos,
    userInfo: store.getState().user.userInfo
  }

  clear () {}

  handleDelete () {
    console.log('删除')
  }
  handleChangeShow (type) {
    // 事件总线触发事件的处理函数 ⚡⚡⚡
    if (type === 'all') this.setState({
      todos: store.getState().todolist.todos
    })
    else this.setState({
      todos: store.getState().todolist.todos.filter((item) => {
        return type === 'finished' ? item.isFinished : !item.isFinished
      })
    })
  }

  render () {
    const { todos } = this.state
    return (
      <>
      <TransitionGroup>
        {
          todos.map((item, index) => {
            return <CSSTransition
            timeout={ 300 }
            classNames={ 'fade' }
            unmountOnExit
            key={ item.lid }
            >
            <TodoLi
              key={ item.lid }>
            <CheckBox
              $myId={ item.lid }
              $index={ index + '' }
              $checked={ item.isFinished }
            ></CheckBox>
            <Contents state={ item.isFinished } className="list-content">{ item.content }</Contents>
            <DeleteBtn onClick={ this.handleDelete } $btnId={ item.lid }></DeleteBtn>
            </TodoLi>
            </CSSTransition>
          })
        }
        </TransitionGroup>
      </>
    )
  }
  componentDidMount () {
    const todos = []
    const userid = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).userid : ''
    console.log(userid)
    const token = localStorage.getItem('todo_token') || ''
    if (userid) {
      axios({
        method: 'GET',
        url: `http://localhost:8080/lists/getlist/${userid}`,
        headers: { authorization: token }
      })
      .then((result, err) => {
        result.data.data.forEach(item => {
          todos.push(item)
          store.dispatch(actions.initState(todos))
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
    this.clear = store.subscribe(() => {
      this.setState({ todos: store.getState().todolist.todos })
      this.setState({ userInfo: store.getState().user.userInfo })
    })

    // 绑定事件总线处理函数
    EventBus.on('change-show', this.handleChangeShow)
  }
  componentWillUnmount () {
    this.clear()
  }
}

export default List
