import React from "react";
import { StateProvider } from "./context/Store";
import "./App.css";
import playersMock from './data/players_teams'
import RegionSelection from "./components/RegionSelection";

function App() {
  const initialState = {
    user: {
      name: "Bob",
      admin: false,
      votes: []
    },
    region: "hk",
    players: playersMock
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_REGION":
        return {
          ...state,
          region: action.payload
        };
      case "ADD_PLAYER_VOTE":
        console.log(state.user.votes)
        return {
          ...state,
          user: { ...state.user, votes: action.payload}
        };
      default:
        return state;
    }
  };

  // const Home = styled.div`
  //   padding: 20px;
  // `;

  // let endVoting;
  // if(user.admin){
  //   endVoting = <Button>Stop Voting</Button>
  // }else {
  //   endVoting = null
  // }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* <p>You are logged in as: {user.name}  {endVoting}</p> */}
      <RegionSelection />
    </StateProvider>
  );
}

export default App;
