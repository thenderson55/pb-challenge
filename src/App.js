import React from "react";
import { StateProvider } from "./context/store";
import RegionSelection from "./components/RegionSelection";
import { initialState, reducer } from './context/reducer'

function App() {

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
