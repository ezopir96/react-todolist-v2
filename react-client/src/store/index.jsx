import { createStore, combineReducers, applyMiddleware } from 'redux'
// ⚡⚡ reduxjs/toolkit ⚡⚡
import todolistReducer from './module/todolist'
import userReducer from './module/user/index'

import thunk from 'redux-thunk'

const reducer = combineReducers({
  todolist: todolistReducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
