import { LOG_USER_TYPE } from './type'
import _ from 'lodash'
import localStorage from 'localStorage'

const userInfo = JSON.parse(localStorage.getItem('user_info')) || ''

const initialState = { userInfo: {userid: userInfo.uerid??'', nickname: userInfo.nickname??''} }

const reducer = (state = initialState, action) => {
  if (!action.type.startsWith('userinfo/')) return state
  const newState = _.cloneDeep(state)
  switch (action.type) {
    case LOG_USER_TYPE:
      console.log('action.payload ==', action.payload)
      newState.userInfo.userid = action.payload.userid
      newState.userInfo.nickname = action.payload.nickname
      break;
    default:
      break;
  }

  return newState
}

export default reducer
