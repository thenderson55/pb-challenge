import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../context/store";
import hk from "../images/hk.png"
import jp from "../images/jp.png"
import tw from "../images/tw.png"

const PlayerList = () => {
  const [{ user, players, voteCount, votedList, endVoting, region, totalVotes }, dispatch] = useStateValue()
  const [ votes, setVotes ] = useState(totalVotes)
  const flags = {
    'hk': hk,
    'jp': jp,
    'tw': tw
  }

  const PlayersWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `;

  const Player = styled.li`
    width: 170px;
    padding: 5px;
    list-style-type: none;
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
      border-color: ${() => user.status !== 'user' ? "rgb(71, 81, 93)" : null};
      border-color: ${() => endVoting ? "rgb(71, 81, 93)" : null};
    }
  `;

  const Percentage = styled.div`
    position: sticky;
    margin: auto;
    max-width: 70px;
    z-index: 2;
    transform: translateY(20px);
    font-size: 10px;
    background-color: rgb(216,216,216);
    color: black;
    padding: 1px 5px;
    border-radius: 3px;
    visibility: ${() => endVoting ? 'visible' : 'hidden'};
  `;

  const Selection = styled.div`
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
    // Check voting is still open and it is a 'user'
    if(endVoting || user.status !== 'user'){
      return;
    }
    // Check if already voted for the player then remove
    if(user.votes.some(player => player.nickname === nickname)){
      user.votes.splice(user.votes.findIndex(player => player.nickname === nickname),1);
      // Decrease players vote count
      players.forEach(player => {
        if(player.nickname === nickname){
          player.votes = player.votes - 1
        }
      })
      dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount + 1 });
      // Decrease total regional vote count
      players.forEach(player => {
        if(player.country === region && player.votes){
          setVotes({ ...votes,
            [region]: votes[region] - 1
          })
        }
      })
      // Remove selected player from indexed list
      const newVotedList = votedList.filter(item => item !== index)
      dispatch({ type: "UPDATE_VOTEDLIST", payload: newVotedList });
      return;
    } 
    // Check user doen't have more than three votes
    if(user.votes.length === 3 ){
      alert("You have already voted for three people")
      return;
    } 
    // Check user is only voting for one region
    if(user.votes.some(player => player.country !== region)){
      alert('You can only vote for one region')
      return;
    }
    // Add voted player to votes array
    user.votes.push({nickname: nickname, country: country})
    dispatch({ type: "ADD_PLAYER_VOTE", payload: user.votes });
    // Increase players vote count
    players.forEach(player => {
      if(player.nickname === nickname){
        player.votes = player.votes + 1 || 1
        dispatch({ type: "INCREASE_PLAYERS_VOTE", payload: players });
      }
    })
    // Decrease number of votes remaining
    dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount - 1 }); 
    // Add selected player to indexed list
    dispatch({ type: "UPDATE_VOTEDLIST", payload: [...votedList, index] });
    // Increase total regional vote count
    players.forEach(player => {
      if(player.country === region && player.votes){
        setVotes({ ...votes,
          [region]: votes[region] + player.votes
        })
      }
    })
  }

  const stopVoting = () => {
    dispatch({ type: "CHANGE_VOTING", payload: !endVoting })
    dispatch({ type: "UPDATE_TOTALVOTES", payload: votes })
  }

  let endVotingButton;
  if(user.status === 'admin'){
    endVotingButton = <VotingButton onClick={stopVoting}></VotingButton>
  }

  const playerList = (
    <>
    <p>You are logged in as: {user.status}  {endVotingButton}</p>
    <PlayersWrapper>
      {players &&
        players.map((player, index) => {
          if (player.country === region) {
            if(votedList.includes(index) && user.status !== 'visitor' && user.status !== 'admin'){
              return (  
                <Player key={index}>                    
                  <AvatarContainer>
                    { player.votes ? <Percentage style={{backgroundColor: 'rgb(255, 125, 8)', color: '#ededed' }}>
                    {  Number((player.votes/totalVotes[region]*100).toFixed(2)) }%
                    </Percentage> : null }
                    <Selection>Your selection</Selection>
                    <PlayerAvatar onClick={() => selectPlayer(player.nickname, player.country, index)} style={{borderColor: 'rgb(255, 125, 8)'}} src={player.avatarUrl}/>
                  </AvatarContainer>
                  <PlayerName>{player.nickname} <img src={flags[region]} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            } 
            else {
              return (
                <Player key={index}>
                  <AvatarContainer>
                    { player.votes ? <Percentage>
                    { Number((player.votes/totalVotes[region]*100).toFixed(2)) }%
                    </Percentage> : <Percentage>0%</Percentage> }
                    <Selection style={{ visibility: 'hidden'}}>Your selection</Selection>
                    <PlayerAvatar onClick={() => selectPlayer(player.nickname, player.country, index)} src={player.avatarUrl}/>
                  </AvatarContainer>
                  <PlayerName>{player.nickname} <img src={flags[region]} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            }
          }
        })}
    </PlayersWrapper>
    </>
  );
 
  return (
    <>
      {playerList}
    </> 
  );
};

export default PlayerList;
