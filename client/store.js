import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
//action type
const GET_USER = 'GET_USER';
//action creator
export const gotUser = (user) => {
  return {
    type: GET_USER,
     user
  }
}

//thunk creator
export const loginThunk = (formData)=>{
  return async (dispatch) =>{
    try{
      const response = await axios.put('/auth/login',formData);
      dispatch(gotUser(response.data))
    }catch(error){
      console.log(error)
    }
  }
}
export const logOutThunk = () =>{
  return async (dispatch)=>{
    try{
      await axios.delete('/auth/logout');
      dispatch(gotUser(initialState.user))
    }catch(error){
      console.log(error)
    }
  }
}
export const getMeThunk = () =>{
  return async(dispatch)=>{
    try{
      const response = await axios.get('/auth/me');
      dispatch(gotUser(response.data))
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