import Styled from 'styled-components'
import React from 'react'
import style from './CheckOne.module.css'
import actions from '../../store/module/todolist/actions'
import store from '../../store'
import axios from 'axios'



const CheckLabel = Styled.label`
  width: 2.5rem;
  height: 100%;
  display: inline-block;
`

class CheckBox extends React.Component {
  handleToggle (e) {
    const id = e.target.getAttribute('id')
    console.log(id)
    const token = localStorage.getItem('todo_token')
    if (!token) return
    if (id === 'selAll') {
      const isFinished = store.getState().todolist.todos.every((item) => {return item.isFinished})
      axios({
        method: 'PUT',
        url: `http://localhost:8080/lists/toggleall`,
        data: {
          isFinished
        },
        headers: { authorization: token }
      })
      .then((result, err) => {
        store.dispatch(actions.changeAll(isFinished))
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      axios({
        method: 'GET',
        url: `http://localhost:8080/lists/togglelist/${ id }`,
        headers: { authorization: token }
      })
      .then((result, err) => {
        store.dispatch(actions.toggleItem(e.target.checked, id))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  render () {
    const { $myId, $checked } = this.props;
    return (
      <>
        <div className={style.fbox}>
          <input checked={ $checked } type="checkbox" id={ $myId } onChange={ this.handleToggle }/>
          <CheckLabel htmlFor={ $myId }><div className={style.showBox}></div></CheckLabel>
        </div>
      </>
    )
  }
}

export default CheckBox
