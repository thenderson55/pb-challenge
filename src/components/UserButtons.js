import React from "react";
import { useStateValue } from "../context/store";
import Button from "./Button";

export const UserButtons = () => {
  const [{}, dispatch] = useStateValue();

  const changeUser = (e) => {
    dispatch({ type: "CHANGE_USER", payload: e.target.value })
  }
  
  return (
    <div style={{margin: '20px 0'}}>
      <Button onClick={changeUser} value='visitor'>Visitor</Button>
      <Button onClick={changeUser} value='user'>User</Button>
      <Button onClick={changeUser} value='admin'>Admin</Button>
    </div>
  )
}