import React, { useState, useContext } from 'react';
import './App.css';
import {MyContext} from "./context/MyContext";
import RegionSelection from  './components/RegionSelection'
// import PlayerList from './components/PlayerList'
import Button from './components/Button'

function App() {
  // const [state, setState] = useState({
  //   user: "admin"
  // })
  const { user } = useContext(MyContext);

  let endVoting;
  if(user == "admin"){
    endVoting = <Button>Stop Voting</Button>
  }

  return (
    <div className="App">
      <RegionSelection></RegionSelection>
      {/* <PlayerList></PlayerList> */}
      <p>You are logged in as: {user}</p>
      {endVoting}
    </div>
  );
}

export default App;
