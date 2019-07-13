import React from "react";
import Button from './Button'

const LogIn = () => {

  function handleSubmit (event) {
    event.preventDefault()
    console.log(event.target.user.value,'YOLO')
  }
  return (
    <form onSubmit={handleSubmit} className="white">
      <h5>Log in</h5>
      <div >
        <label htmlFor='user'>User Name</label>
        <input type="text" id="user" />
      </div>
      <Button>Log In</Button>
    </form>
  )
}

export default LogIn
