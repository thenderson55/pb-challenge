import React from "react";
import { useStateValue } from "../context/store";
import Button from "./Button";
import styled from "styled-components";
import PlayerList from "./PlayerList";
import { RegionButtons } from "./RegionButtons"


const RegionSelection = props => {
  const [{ region, endVoting, voteCount}, dispatch] = useStateValue();

  const RegionHeader = styled.span`
    font-size: 30px;
    font-weight: 700;
    &::before{
      content: "${() => endVoting ? 'Results of voting for each region': 'Vote for players to represent your region'}"
    }
  `;
  const SelectionText = styled.p`
    &::before{
      content: "${() => endVoting ? 'Select your region to browse players.': 'Select your region to browse players. NOTE : You may only vote for one region.'}"
    }
  `;
  const VotingText = styled.p`
    &::before{
      content: "${() => endVoting ? `The top three vote earners in each region make up that region's team`: `Click on up to three player to place your votes. (${voteCount} votes remaining)`}"
    }
  `;

  return (
    <div style={{textAlign: 'center'}}>
      <RegionHeader/>
      <SelectionText/>
      <RegionButtons/>
      <VotingText/>
      <PlayerList/>
    </div>
  );
};

export default RegionSelection;
