export const addPlayer = (player) => {
  console.log('hello from action')
  return ({ type: "ADD_PLAYER", payload: player })
};