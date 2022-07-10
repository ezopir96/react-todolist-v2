import { CREATE_TODOITEM_TYPE, DELETE_TODOITEM_TYPE, INIT_TODOITEM_TYPE, SELALL_TODOITEM_TYPE, TOGGLE_TODOITEM_TYPE } from './types'
import _ from 'lodash'

const initialState = {
  todos: []
}

const reducer = (prevState = initialState, action) => {
  if (!action.type.startsWith('todolist/')) return prevState
  // console.log('actions pass | ', action)
  const state = _.cloneDeep(prevState)
  switch (action.type) {
    case CREATE_TODOITEM_TYPE:
      state.todos.push(action.payload)
      break;
    case TOGGLE_TODOITEM_TYPE:
      const { checkState, id } = action.payload
      state.todos.forEach((item) => {
        if (item.lid === id) item.isFinished = checkState
      })
      break;
    case SELALL_TODOITEM_TYPE:
      state.todos.forEach((item) => {
        item.isFinished = !action.payload
      })
      break;
    case DELETE_TODOITEM_TYPE:
      state.todos = _.cloneDeep(prevState.todos.filter((item) => {
        return item.lid !== action.payload
      }))
      break;
    case INIT_TODOITEM_TYPE:
      state.todos = action.payload
      break;
    default:
      break;
  }
  return state
}

export default reducer
