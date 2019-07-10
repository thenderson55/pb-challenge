import React, { useContext } from "react";
// import Player from "./Player";
import styled from "styled-components";
import {MyContext} from "../context/MyContext";

const PlayerList = (props) => {
  const { players } = useContext(MyContext);

  let playerList;

  const Player = styled.li`
    width: 170px;
    margin-top: 20px;
    padding: 5px;
  `
  const PlayerWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: center; */
  `
  
  playerList = (
    <PlayerWrapper>
      {players &&
        players.map(player => {
          if (player.country == props.region) {
            return (
              <Player>
                <p>{player.nickname}</p>
                <p>{player.owner}</p>
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
