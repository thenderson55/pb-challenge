import React, { useContext, useState } from "react";
import styled from "styled-components";
import playersContext from "../context/playersContext";
import Button from './Button'
import hk from "../images/hk.png"
import jp from "../images/jp.png"
import tw from "../images/tw.png"

const PlayerList = (props) => {
  const { players } = useContext(playersContext);
  const hkPlayers = []
  const jpPlayers = []
  const twPlayers = []
  players.forEach(player => {
    if(player.country == 'hk'){
      hkPlayers.push(player)
    }else if(player.country == 'jp'){
      jpPlayers.push(player)
    }else if(player.country == 'tw'){
      twPlayers.push(player)
    }
  })
  
  const [user, setUser] = useState({ name: 'Bob', status: 'admin', votes: []})
  const [voteCount, setVoteCount] = useState(3)
  const [endVoting, setEndVoting] = useState(false)
  
  // List used to change styling according to player index
  const [votedList, setVotedList] = useState([])

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

  const selectPlayer = (nickname, country, index) => {
    if(endVoting || user.status === 'visitor' || user.status === 'admin'){
      return
    }
    // Check they haven't already voted for the player
    if(user.votes.some(player => player.nickname == nickname)){
      const checkToRemove = window.confirm('You have already voted for this player, do you want to remove him/her from your voting selection?')
      // Remove vote after confirmation
      if(checkToRemove){
        user.votes.splice(user.votes.findIndex(player => player.nickname == nickname),1);
        setVoteCount(voteCount + 1)
        const newVotedList = votedList.filter(item => item !== index)
        setVotedList(newVotedList)
        return
      }
      return
    } 
    // Check they don't have more than three votes
    if(user.votes.length == 3 ){
      alert("You have already voted for three people")
      return;
    } 
    // Check that they are only voting for one region
    if(user.votes.some(player => player.country !== props.region)){
      alert('You can only vote for one region')
      return
    }
    // Add voted player to votes array
    user.votes.push({nickname: nickname, country: country})
    setVoteCount(voteCount - 1)
    setVotedList([...votedList, index]) 
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
    endVotingButton = <Button onClick={stopVoting}>Stop Voting</Button>
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
          if (player.country == props.region) {
            if(votedList.includes(i)){
              return (  
                <Player onClick={() => selectPlayer(player.nickname, player.country, i)} key={i}>                    
                  {percentages}
                  <AvatarContainer>
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
                  {percentages}
                  <AvatarContainer>
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
    <div>
      <p>You are logged in as: {user.name}  {endVotingButton}</p>
      <p>You have {voteCount} votes remaining.</p>
      {playerList}
      <Button onClick={changeUser} value='visitor'>Visitor</Button>
      <Button onClick={changeUser} value='user'>User</Button>
      <Button onClick={changeUser} value='admin'>Admin</Button>
    </div> 
  );
};

export default PlayerList;
