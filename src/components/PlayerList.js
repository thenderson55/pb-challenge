import React, { useContext, useState } from "react";
// import Player from "./Player";
import styled from "styled-components";
import playersContext from "../context/playersContext";
import wales from "../images/wales.png"

const PlayerList = (props) => {
  const { players } = useContext(playersContext);
  // console.log(region, players)
  // let playerList;
  const [user, setUser] = useState({ id: 1, admin: false, votes: []
  })
  console.log(user)

  const Player = styled.li`
    width: 170px;
    margin-top: 20px;
    padding: 5px;
    list-style-type: none;
  `
  const PlayerAvatar = styled.img`
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    position: relative;
    overflow: hidden;
    border-width: 5px;
    border-style: solid;

    border-color: rgb(71, 81, 93);
    border-image: initial;
    border-radius: 50%;
    &:hover {
      border-color: rgb(255, 125, 8);
    }
  `;

  const PlayerName = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  `;
  const PlayerMessage = styled.p`
    font-size: 12px;
    text-align: left;
    padding: 0 10px;
  `;

  const PlayerWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: center; */
  `;

  const selectPlayer = (nickname) => {
    console.log(nickname)
    if(user.votes.includes(nickname) ){
      const checkToRemove = window.confirm('You have already voted for this player, do you want to remove him/her from your voting selection?')
      if(checkToRemove){
        return user.votes.splice(user.votes.findIndex(name => name === nickname),1);
      }
    }
    if(user.votes.length == 3 ){
      alert("You have already voted for three people")
      return;
    }   
    user.votes.push(nickname)
    console.log(user)
  }
  
  const playerList = (
    <PlayerWrapper>
      {players &&
        players.map((player, i) => {
          if (player.country == props.region) {
            return (
              <Player onClick={() => selectPlayer(player.nickname)} key={i}>
                <PlayerAvatar src={player.avatar}/>
                <PlayerName>{player.nickname} <img src={wales} alt=""/></PlayerName>
                <PlayerMessage>{player.message}</PlayerMessage>
              </Player>
            );
          }
        })}
    </PlayerWrapper>
  );
  
  return (
    <div>
      {playerList}
    </div> 
  );
};

export default PlayerList;
