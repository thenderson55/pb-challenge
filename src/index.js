import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import players from './data/players_teams'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const initialState = {
  user: {
    name: 'Bob',
    status: 'user',
    votes: []
  },
  players: players,
  region: 'hk',
  voteCount: 3,
  endVoting: false,
  votedList: []
}



const reducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_PLAYER":
    return {
      ...state,
      user: {
        ...state.user,
        votes: action.payload
      }
    }
  }
  return state
}

const store = createStore(reducer, initialState)


ReactDOM.render(
<Provider store={store}>
  <App /> 
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
