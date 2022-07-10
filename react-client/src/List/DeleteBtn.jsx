import axios from 'axios'
import React from 'react'
import Styled from 'styled-components'
import store from '../store'
import actions from '../store/module/todolist/actions'
import localStorage from 'localStorage'

const DelBtn = Styled.button`
  height: 100%;
  width: 3.125rem;
  background-color: rgb(172, 19, 19);
  border: none;
  cursor: pointer;
  color: white;
  &:active {
    background-color: pink;
  }
`
class DeleteBtn extends React.Component {
  handleDelete (e) {
    // console.log(e.target.getAttribute('id'))
    const id = e.target.getAttribute('id')
    const token = localStorage.getItem('todo_token')
    axios({
      method: 'DELETE',
      url: `http://localhost:8080/lists/deletelist/${ id }`,
      headers: { authorization: token }
    })
    .then((result, err) => {
      store.dispatch(actions.deleteOne(id))
    })
  }
  render () {
    const { $btnId } = this.props;
    return (
      <>
        <DelBtn className="del-btn" id={ $btnId } onClick={ this.handleDelete }>X</DelBtn>
      </>
    )
  }
}

export default DeleteBtn
