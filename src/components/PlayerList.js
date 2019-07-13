import React from "react";
import styled from "styled-components";

import { useStateValue } from "../context/store";
import hk from "../images/hk.png"
import jp from "../images/jp.png"
import tw from "../images/tw.png"

const PlayerList = () => {
  const [{ user, players, voteCount, votedList, endVoting, region }, dispatch] = useStateValue()
  
  const hkPlayers = []
  const jpPlayers = []
  const twPlayers = []
  players.forEach(player => {
    if(player.country === 'hk'){
      hkPlayers.push(player)
    }else if(player.country === 'jp'){
      jpPlayers.push(player)
    }else if(player.country === 'tw'){
      twPlayers.push(player)
    }
  })

  const Player = styled.li`
    width: 170px;
    margin-top: 20px;
    padding: 5px;
    list-style-type: none;
    font-family: Noto Sans Japanese,Noto Sans,sans-serif;
    background-color: #2f353d;
    color: #ededed; 
  `
  const AvatarContainer = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5px;
    position: relative;
  `;

  const PlayerAvatar = styled.img`
    width: 80px;
    height: 80px;
    z-index: 1;
    position: relative;
    overflow: hidden;
    border-width: 5px;
    border-style: solid;
    border-color: rgb(71, 81, 93);
    border-image: initial;
    border-radius: 50%;
    &:hover {
      border-color: ${() => votedList.length !== 3 ? "rgb(255, 125, 8)" : null};
      border-color: ${() => user.status === 'visitor' ? "rgb(71, 81, 93)" : null};
      border-color: ${() => endVoting ? "rgb(71, 81, 93)" : null};
    }
  `;

  const Percentage = styled.div`
    position: sticky;
    margin: auto;
    width: 20px;
    z-index: 2;
    transform: translateY(20px);
    font-size: 10px;
    background-color: rgb(216,216,216);
    color: black;
    padding: 1px 5px;
    border-radius: 3px;
  `;

  const Selection = styled.div`
    /* position: sticky; */
    /* margin: auto; */
    width: 65px;
    z-index: 2;
    transform: translateY(90px);
    font-size: 10px;
    background-color: rgb(255, 125, 8);
    padding: 1px 5px;
    border-radius: 3px;
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
  `;

  const VotingButton = styled.button`
    border-radius: 3px;
    height: 20px;
    width: 100%;
    margin-left: 10px;
    max-width: 100px;
    font-weight: 500;
    font-size: 12px;
    user-select: none;
    background: rgb(216, 216, 216);
    cursor: pointer;
    &:hover {
      background: rgb(255, 125, 8);
      border-color: rgb(255, 125, 8);
    }
    &::before{
      content: "${() => endVoting ? 'Start voting': 'Stop voting'}";
    }
  `;  



  const selectPlayer = (nickname, country, index) => {
    if(endVoting || user.status === 'visitor' || user.status === 'admin'){
      return
    }
    // Check they haven't already voted for the player
    if(user.votes.some(player => player.nickname === nickname)){
      const checkToRemove = window.confirm('You have already voted for this player, do you want to remove him/her from your voting selection?')
      // Remove vote after confirmation
      if(checkToRemove){
        user.votes.splice(user.votes.findIndex(player => player.nickname === nickname),1);
        dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount + 1 });
        const newVotedList = votedList.filter(item => item !== index)
        dispatch({ type: "UPDATE_VOTEDLIST", payload: newVotedList });
        return
      }
      return
    } 
    // Check they don't have more than three votes
    if(user.votes.length === 3 ){
      alert("You have already voted for three people")
      return;
    } 
    // Check that they are only voting for one region
    if(user.votes.some(player => player.country !== region)){
      alert('You can only vote for one region')
      return
    }
    // Add voted player to votes array
    user.votes.push({nickname: nickname, country: country})
    dispatch({ type: "ADD_PLAYER_VOTE", payload: user.votes });
    dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount - 1 }); 
    dispatch({ type: "UPDATE_VOTEDLIST", payload: [...votedList, index] });
  }

  const stopVoting = () => {
    dispatch({ type: "CHANGE_VOTING", payload: !endVoting })

  }

  let endVotingButton, percentages;
  if(user.status === 'admin'){
    endVotingButton = <VotingButton onClick={stopVoting}></VotingButton>
  }
  if(user.status === 'admin' && endVoting){
    percentages = <Percentage>23</Percentage> 
  }
  if(user.status === 'visitor' && endVoting){
    percentages = <Percentage>23</Percentage> 
  }
  if(user.status === 'user' && endVoting){
    percentages = <Percentage>23</Percentage> 
  }

  const changeUser = (e) => {
    console.log(e.target.value)
    setUser({...user, status: e.target.value })
  }
  const stopVoting = () => {
    console.log(endVoting)
    setEndVoting(!endVoting)
    console.log(endVoting)
  }

  let endVotingButton, percentages;
  if(user.status === 'admin'){
    endVotingButton = <VotingButton onClick={stopVoting}></VotingButton>
  }
  if(user.status === 'visitor' && endVoting){
    percentages = <Percentage>23</Percentage> 
  }
  if(user.status === 'user' && endVoting){
    percentages = <Percentage>23</Percentage> 
  }
  

  const playerList = (
    <>
    <PlayerWrapper>
      {players &&
        players.map((player, i) => {
          if (player.country === region) {
            if(votedList.includes(i)){
              return (  
                <Player onClick={() => selectPlayer(player.nickname, player.country, i)} key={i}>                    
                  {percentages}
                  <AvatarContainer>
                    {percentages}
                    <Selection>Your selection</Selection>
                    <PlayerAvatar style={{borderColor: 'rgb(255, 125, 8)'}} src={player.avatarUrl}/>
                  </AvatarContainer>
                  <PlayerName>{player.nickname} <img src={hk} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            } 
            else {
              return (
                <Player onClick={() => selectPlayer(player.nickname, player.country, i)} key={i}>
                  <AvatarContainer>
                    {percentages}
                    <Selection style={{ visibility: 'hidden'}}>Your selection</Selection>
                    <PlayerAvatar src={player.avatarUrl}/>
                  </AvatarContainer>
                  <PlayerName>{player.nickname} <img src={tw} alt=""/></PlayerName>
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

    <>
      <p>You are logged in as: {user.name}  {endVotingButton}</p>
      {playerList}
    </> 
  );
};

export default PlayerList;
