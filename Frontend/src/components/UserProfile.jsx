import React from 'react'
import { useContext } from 'react'
import {LoginContext} from "../context/AppContext"
const UserProfile = ( ) => {
    const {isLoggedIn,Onlogout,onLogin} = useContext(LoginContext)
  return (
    <div>
      <h1>user Proile</h1>

      {isLoggedIn?(
        <>
      <p>welcome , user</p>
      <button onClick={Onlogout}>Logout</button>
      </>
      ):(
         <>
      <p>Please Login in</p>
      <button onClick={onLogin}>login</button>
      </>
      )}
    </div>
    
  )
}

export default UserProfile
