import React from "react";
import { useStateValue } from "../context/store";
import styled from "styled-components";
import { RegionButtons } from "./RegionButtons";

const RegionSelection = () => {
  const [{ endVoting, voteCount }] = useStateValue();

  const RegionHeader = styled.span`
    font-size: 30px;
    font-weight: 700;
    &::before{
      content: "${() =>
        endVoting
          ? "Results of voting for each region"
          : "Vote for players to represent your region"}"
    }
  `;
  const SelectionText = styled.p`
    &::before{
      content: "${() =>
        endVoting
          ? "Select your region to browse players."
          : "Select your region to browse players. NOTE : You may only vote for one region."}"
    }
  `;
  const VotingText = styled.p`
    &::before{
      content: "${() =>
        endVoting
          ? `The top three vote earners in each region make up that region's team`
          : `Click on up to three players to place your votes. (${voteCount} votes remaining)`}"
    }
  `;

  return (
    <>
      <RegionHeader />
      <SelectionText />
      <RegionButtons />
      <VotingText />
    </>
  );
};

export default RegionSelection;
