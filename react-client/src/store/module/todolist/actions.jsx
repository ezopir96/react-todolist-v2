import {
  CREATE_TODOITEM_TYPE,
  DELETE_TODOITEM_TYPE,
  TOGGLE_TODOITEM_TYPE,
  SELALL_TODOITEM_TYPE,
  INIT_TODOITEM_TYPE 
} from './types'
import axios from 'axios'
import { nanoid } from 'nanoid'

const actions = {
  createTodoItem (content) {
    // console.log(item)
    return { type: CREATE_TODOITEM_TYPE, payload: content }  // 💧💧💧THis is payload。
  },
  toggleItem (checkState, id) {
    // console.log(checkState, id)
    return { type: TOGGLE_TODOITEM_TYPE, payload: { checkState, id } }
  },
  changeAll (checkState) {
    return { type: SELALL_TODOITEM_TYPE, payload: checkState }
  },
  deleteOne (id) {
    return { type: DELETE_TODOITEM_TYPE, payload: id }
  },
  initState (todos) {
    return { type: INIT_TODOITEM_TYPE, payload: todos }
  }
}

export default actions
