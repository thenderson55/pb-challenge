import React, {  useContext } from "react";
import Button from './Button'
import PlayersContext from '../context/MyContext'
import styled from 'styled-components'

const Player = () => {
  const { players } = useContext(PlayersContext)
  // const [state, setState] = useState({
  //   "teams": "hk",
  //   "participantId": "jrqQHhghO2",
  //   "nickname": "xSolozx",
  //   "country": "hk",
  //   "gamerTagBattlenetServer": "asia",
  //   "message": "雖然自從上年季後賽之後都沒有什麼成績，但希望大家可以給我一次機會，在這次比賽上證明自己，幫香港勝出。",
  //   "gamerTag": "xSolozx#3316",
  //   "likeCount": 35,
  //   "owner": "58e6e6151f615b61443e8621",
  //   "avatarUrl": "https://cdn.dekki.com/uploads/users/58e6e6151f615b61443e8621/avatar/original" 
  // })
  console.log(players)
  return (
    <div>
      <p>{players[12].nickname}</p>
      <img src={players[11].owner} alt=""/>
      <Button>Player</Button>
    </div>
  )
}

export default Player