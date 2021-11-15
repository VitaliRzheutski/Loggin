import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
//action type
const GET_USER = 'GET_USER';
const GOT_ME = 'GOT_ME'
//action creator
export const gotUser = (user) => {
  return {
    type: GET_USER, user
  }
}
export const gotMe = (user) =>{
  return{
    type:GOT_ME,
    user
  }
}
//thunk creator
export const loginThunk = (formData)=>{
  return async (dispatch) =>{
    try{
      const {data} = await axios.put('/auth/login',formData);
      dispatch(gotUser(data))
    }catch(error){
      console.log(error)
    }
  }
}
export const getMeThuk = () =>{
  return async(dispatch)=>{
    try{
      const {data} = axios.get('/auth/me');
      dispatch(gotMe(data))
    }catch(error){
      console.log(error)
    }
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