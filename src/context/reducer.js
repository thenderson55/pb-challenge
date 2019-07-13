import playersMock from '../data/players_teams'

export const initialState = {
  user: {
    name: "Bob",
    status: 'user',
    votes: []
  },
  region: "hk",
  players: playersMock,
  voteCount: 3,
  votedList: [],
  endVoting: false,
  totalVotes: {
    hk: 0,
    tw: 0,
    jp: 0,
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_REGION":
      return {
        ...state,
        region: action.payload
      };
    case "ADD_PLAYER_VOTE":
      return {
        ...state,
        user: { ...state.user, votes: action.payload }
      };
    case "INCREASE_PLAYERS_VOTE":
      return {
        ...state,
        players: action.payload 
      };
    case "CHANGE_USER":
      return {
        ...state,
        user: { ...state.user, status: action.payload }
      };
    case "CHANGE_VOTECOUNT":
    return {
      ...state,
      voteCount: action.payload
    };
    case "UPDATE_TOTALVOTES":
      return {
        ...state,
        totalVotes: action.payload
      };
    case "UPDATE_VOTEDLIST":
    return {
      ...state,
      votedList: action.payload
    };
    case "CHANGE_VOTING":
    return {
      ...state,
      endVoting: action.payload
    };
    default:
      return state;
  }
};