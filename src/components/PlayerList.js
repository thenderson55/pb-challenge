import React, { useContext, useState } from "react";
import styled from "styled-components";
import playersContext from "../context/playersContext";
import wales from "../images/wales.png"

const PlayerList = (props) => {
  const { players } = useContext(playersContext);

  const [user, setUser] = useState({ id: 1, admin: false, votes: []
  })
  const [voteCount, setVoteCount] = useState(0)
  const [votedList, setVotedList] = useState([])

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
      border-color: ${() => votedList.length !== 3 ? "rgb(255, 125, 8)" : null};
    }
  `;

  const VotedAvatar = styled(PlayerAvatar)`
    border-color: rgb(255, 125, 8);
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

  const selectPlayer = (nickname, country, index) => {
    console.log(nickname)
    if(user.votes.some(player => player.nickname == nickname)){
      const checkToRemove = window.confirm('You have already voted for this player, do you want to remove him/her from your voting selection?')
      if(checkToRemove){
        user.votes.splice(user.votes.findIndex(player => player.nickname == nickname),1);

        setVoteCount(user.votes.length)

        const newVotedList = votedList.filter(item => item !== index)
        setVotedList(newVotedList)
        return
      }
      return
    }
    // if(user.votes.length == 3 && user.votes.every(player => player.country == country)){
    //   alert('doiff')
    // }
    
    if(user.votes.length == 3 ){
      alert("You have already voted for three people")
      return;
    } 

    user.votes.push({nickname: nickname, country: country})
    setVoteCount(user.votes.length)
    setVotedList([...votedList, index])
  }
  

  const playerList = (
    <>
    <p>You have voted {voteCount} times.</p>
    <PlayerWrapper>
      {players &&
        players.map((player, i) => {
          if (player.country == props.region) {
            if(votedList.includes(i)){
              return (  
                <Player onClick={() => selectPlayer(player.nickname, player.country, i)} key={i}>
                  <VotedAvatar src={player.avatar}/>
                  <PlayerName>{player.nickname} <img src={wales} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            } 
            else {
              return (
                <Player onClick={() => selectPlayer(player.nickname, player.country, i)} key={i}>
                  <PlayerAvatar src={player.avatar}/>
                  <PlayerName>{player.nickname} <img src={wales} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            }
          }
        })}
    </PlayerWrapper>
    </>
  );
  
  return (
    <div>
      {playerList}
    </div> 
  );
};

export default PlayerList;
