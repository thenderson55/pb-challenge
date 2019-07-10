import React from 'react';
import playersMock from '../data/players_teams'



let reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_REGION":
      return { ...state, region: action.payload };
    default:
      return;
  }
};

const initialState = {
  user: 'admin',
  region: 'hk',
  players: playersMock
}

const MyContext = React.createContext(initialState)
// const UpdateRegion = props => {
//   const [state, dispatch] = React.useReducer(reducer, initialState);
//   return (
//     // new
//     <MyContext.Provider value={{ state, dispatch }}>
//        {props.children}
//      </MyContext.Provider>
//    );
// }





export {  MyContext }

