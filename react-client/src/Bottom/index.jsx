import React from "react";
import Styled from 'styled-components'
import CheckBox from '../components/CheckBox/CheckOne'
import style from './index.module.css'
import store from '../store'
import { nanoid } from 'nanoid'
import EventBus from "../utils/bus";

const Stat = Styled.button`
  border-radius: 0;
  height: 3.125rem;
  padding: .625rem;
  font-weight: bolder;
  font-size: 1rem;
  border-color: #666;
`

const Div = Styled.div`
  display: flex;
  height: 3.125rem;
  width: 29.75rem;
  background-color: aliceblue;
`



class Bottom extends React.Component {
  state = {
    LENGTH: (store.getState().todolist.todos).length,
    FINISH_LENGTH : (store.getState().todolist.todos.filter((item) => {
      return item.isFinished
    })).length
  }

  render () {
    return (
      <>
      <Div className={ style['bottom-container']}>
        <CheckBox $myId={'selAll'} key={nanoid()} $index="0" $checked={ (this.state.LENGTH === this.state.FINISH_LENGTH) && (this.state.LENGTH !== 0) }></CheckBox>
        <Stat className={ style.showAll } onClick={ (e) => EventBus.emit('change-show', 'all') }>All</Stat>
        <Stat onClick={ (e) => EventBus.emit('change-show', 'finished') }>Done</Stat>
        <Stat onClick={ (e) => EventBus.emit('change-show', 'unfinished') }>Undone</Stat>
      </Div>
      </>
    )
  }
  componentDidMount () {
    store.subscribe(() => {
      this.setState({
        LENGTH: (store.getState().todolist.todos).length ?? 0,
        FINISH_LENGTH: ((store.getState().todolist.todos.filter((item) => {
          return item.isFinished
        })).length)?? 0
      })
    })
  }
}

export default Bottom
