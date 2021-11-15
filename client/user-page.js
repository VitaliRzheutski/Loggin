import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOutThunk } from './store'

const UserPage = (props) => {
  const {handleClick, user} = props
  console.log('props from userPage:',props)
  if(!user.id){
    return <Redirect to='/' />
  }
  return (
    
    <div className='h100 w100 flex column align-items-center justify-center'>
      <div className='flex'>
        <img className='rounded mr1' />
        <h1>Welcome back!</h1>
        
      </div>
      <p>{user.email}</p>
      <div>
        <button className='btn bg-red white p1 rounded' onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // your code here
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // Hey, check it out! Because we pass the connected UserPage to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".
  const history = ownProps.history

  return {
    async handleClick () {
      // your code here
      try{
        await dispatch(logOutThunk());
        ownProps.history.push("/")
      }catch(error){
        console.log(error)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
