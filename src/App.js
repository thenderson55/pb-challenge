import React, { useState, useContext } from 'react';
import './App.css';
import {MyContext} from "./context/MyContext";
import RegionSelection from  './components/RegionSelection'
import Button from './components/Button'
import styled from 'styled-components'


function App() {
  // const [state, setState] = useState({
  //   user: "admin"
  // })
  const { user } = useContext(MyContext);
  const Home = styled.div`
    padding: 20px;
  `;

  let endVoting;
  if(user == "admin"){
    endVoting = <Button>Stop Voting</Button>
  }

  return (
    <Home className="App">
      <RegionSelection></RegionSelection>
      <p>You are logged in as: {user}</p>
      {endVoting}
    </Home>
  );
}

export default App;
