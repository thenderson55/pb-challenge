import playersMock from '../data/players_teams'

export const initialState = {
  user: {
    name: "Bob",
    admin: false,
    votes: []
  },
  region: "hk",
  players: playersMock,
  voteCount: 3,
  votedList: []
};

export const reducer = (state, action) => {
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
    case "CHANGE_VOTECOUNT":
    return {
      ...state,
      voteCount: action.payload
    };
    case "UPDATE_VOTEDLIST":
    return {
      ...state,
      votedList: action.payload
    };
    default:
      return state;
  }
};