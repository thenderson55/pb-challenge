import React from "react";
import styled from "styled-components";
import { useStateValue } from "../context/store";
import hk from "../images/hk.png"
import jp from "../images/jp.png"
import tw from "../images/tw.png"

const PlayerList = () => {
  const [{ user, players, voteCount, votedList, endVoting, region, hkPlayersVotes, jpPlayersVotes, twPlayersVotes }, dispatch] = useStateValue()
  
  let c = jpPlayersVotes
  console.log(c)

  const Player = styled.li`
    width: 170px;
    margin-top: 20px;
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
    // Check if already voted for the player then remove
    if(user.votes.some(player => player.nickname === nickname)){
      user.votes.splice(user.votes.findIndex(player => player.nickname === nickname),1);
      // Decrease players vote count
      players.forEach(player => {
        if(player.nickname === nickname){
          player.votes = player.votes - 1
          console.log(player)
        }
      })
      // Decrease total regional vote count
      players.forEach(player => {
        if(player.country === 'hk' && player.votes){
          dispatch({ type: "UPDATE_TOTAL_VOTES", payload: hkPlayersVotes + player.votes }); 
        }else if(player.country === 'jp' && player.votes){
          return jpPlayersVotes - player.votes
        }else if(player.country === 'tw' && player.votes){
          return twPlayersVotes - player.votes
        }
      })
      dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount + 1 });
      const newVotedList = votedList.filter(item => item !== index)
      dispatch({ type: "UPDATE_VOTEDLIST", payload: newVotedList });
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
    // Increase players vote count
    players.forEach(player => {
      if(player.nickname === nickname){
        player.votes = player.votes + 1 || 1
        // dispatch({ type: "INCREASE_PLAYERS_VOTE", payload: players });
        console.log(player)
      }
    })
    dispatch({ type: "ADD_PLAYER_VOTE", payload: user.votes });
    dispatch({ type: "CHANGE_VOTECOUNT", payload: voteCount - 1 }); 
    dispatch({ type: "UPDATE_VOTEDLIST", payload: [...votedList, index] });
    // Increase total regional vote count
    players.forEach(player => {
      if(player.country === 'hk' && player.votes){
        dispatch({ type: "UPDATE_TOTAL_VOTES", payload: hkPlayersVotes + player.votes }); 
        console.log(hkPlayersVotes)
      }else if(player.country === 'jp' && player.votes){
        return hkPlayersVotes + player.votes
      }else if(player.country === 'tw' && player.votes){
        return hkPlayersVotes + player.votes
      }
    })
    console.log(hkPlayersVotes)
    // console.log(1/hkPlayersVotes*100)
  }

  const stopVoting = () => {
    dispatch({ type: "CHANGE_VOTING", payload: !endVoting })
    console.log(hkPlayersVotes)
    players.forEach(player => {
      console.log(hkPlayersVotes)

      if(player.country === 'hk' && player.votes){
        console.log(player.nickname, player.votes, hkPlayersVotes)
        player.votes = player.votes/hkPlayersVotes*100
        console.log('oo', player.votes)
      }else if(player.country === 'jp' && player.votes){
        player.votes = player.votes/jpPlayersVotes*100
      }else if(player.country === 'tw' && player.votes){
        player.votes = player.votes/twPlayersVotes*100
      }
    })
    console.log()
  }

  let endVotingButton, percentages;
  if(user.status === 'admin'){
    endVotingButton = <VotingButton onClick={stopVoting}></VotingButton>
  }
  if(user.status === 'admin' && endVoting){
    percentages = <Percentage></Percentage> 
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
        players.map((player, index) => {
          if (player.country === region) {
            if(votedList.includes(index)){
              return (  
                <Player key={index}>                    
                  <AvatarContainer>
                    <Percentage>{ player.votes/hkPlayersVotes*100 }</Percentage>
                    {percentages}
                    <Selection>Your selection</Selection>
                    <PlayerAvatar onClick={() => selectPlayer(player.nickname, player.country, index)} style={{borderColor: 'rgb(255, 125, 8)'}} src={player.avatarUrl}/>
                  </AvatarContainer>
                  <PlayerName>{player.nickname} <img src={hk} alt=""/></PlayerName>
                  <PlayerMessage>{player.message}</PlayerMessage>
                </Player>
              );
            } 
            else {
              return (
                <Player key={index}>
                  <AvatarContainer>
                    {percentages}
                    <Selection style={{ visibility: 'hidden'}}>Your selection</Selection>
                    <PlayerAvatar onClick={() => selectPlayer(player.nickname, player.country, index)} src={player.avatarUrl}/>
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
