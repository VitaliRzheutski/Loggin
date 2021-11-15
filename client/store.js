import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
//action type
const GET_USER = 'GET_USER';
//action creator
export const gotUser = (user) => {
  return {
    type: GET_USER, user
  }
}
const initialState = {
  user: {}
}
//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state, user: action.user
      }
    default: return state
  }
}
export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))