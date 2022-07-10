import { LOG_USER_TYPE } from './type'
const action = {
  logUser (userInfo) {
    return { type: LOG_USER_TYPE, payload: userInfo }
  }
}