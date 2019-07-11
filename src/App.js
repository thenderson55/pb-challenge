import React, { useState, useContext } from 'react';
import './App.css';
import {MyContext} from "./context/MyContext";
import RegionSelection from  './components/RegionSelection'
import Button from './components/Button'
import styled from 'styled-components'

function App() {
  const [user, setUser] = useState({ name: 'Bob', admin: false, votes: []})

  console.log(user)
  // const { user } = useContext(MyContext);
  const Home = styled.div`
    padding: 20px;
  `;

  let endVoting;
  if(user.admin){
    endVoting = <Button>Stop Voting</Button>
  }else {
    endVoting = null
  }
  
  return (
    <Home className="App">
      <p>You are logged in as: {user.name}  {endVoting}</p>
      <RegionSelection user={user}></RegionSelection>
    </Home>
  );
}

export default App;
