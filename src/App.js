import React from "react";
import { StateProvider } from "./context/store";
import RegionSelection from "./components/RegionSelection";
import { initialState, reducer } from './context/reducer'
import { UserButtons } from './components/UserButtons'
import PlayerList from "./components/PlayerList";


function App() {
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <RegionSelection/> 
      <PlayerList/>
      <UserButtons/>
    </StateProvider>
  );
}

export default App;
