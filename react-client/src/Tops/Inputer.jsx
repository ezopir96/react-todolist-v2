import React from 'react'
import Styled from 'styled-components'
import Button from './Buttons'
// ⭐⭐⭐ 使用绝对路径标识符
import store from '../store'
import actions from '../store/module/todolist/actions'
import axios from 'axios'
import localStorage from 'localStorage'
import { nanoid } from 'nanoid'

const Inputs = Styled.input`
  width: 25rem;
  height: 3.125rem;
  background-color: #eee;
  padding-left: 0.625rem;
  border-radius: 0;
  outline: none;
  border: none;
  font-size: 1.5rem;
`

class Inputer extends React.Component {
  state = {
    todos: store.getState().todolist.todos
  }
  handleAdd = (e) => {
    const content = document.querySelector('#inputContent')
    if (content.value === '') return alert('输入内容不能为空')
    if (!localStorage.getItem('user_info')) return alert('还没有登录, 请先登录(。・∀・)')
    
    const { userid } = JSON.parse(localStorage.getItem('user_info'))
    const token = localStorage.getItem('todo_token')
    // const data = JSON.stringify({ userid, content: content.value })
    axios({
      method: 'POST',
      url: 'http://localhost:8080/lists/addlist',
      data: {
        lid: nanoid(),
        userid,
        content: content.value
      },
      headers: { authorization: token }
    })
    .then(result => {
      console.log(result.data.data)
      store.dispatch(actions.createTodoItem(result.data.data));
    })
    .catch(err => {
      console.log(err)
    })

    if (content && (content.tagName === 'INPUT')) content.value = ''
  }
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <>
      <div className="inputer_container">
        <Inputs id="inputContent" type="text"></Inputs>
        <Button onClick={ this.handleAdd }>ADD</Button>
      </div>
      </>
    )
  }
}

export default Inputer
