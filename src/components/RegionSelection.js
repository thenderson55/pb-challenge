import React from "react";
import { useStateValue } from "../context/store";
import Button from "./Button";
import styled from "styled-components";
import PlayerList from "./PlayerList";


const RegionSelection = props => {
  const [{ region, endVoting }, dispatch] = useStateValue();

  const Regions = styled.div`
    display: flex;
    margin: auto;
    width: 50%;
    flex-direction: row;
    justify-content: space-evenly;
    text-align: center;
  `;

  const RegionHeader = styled.span`
    font-size: 30px;
    font-weight: 700;
    &::before{
      content: "${() => endVoting ? 'Voting closed': 'Vote for players to represent your region'}"
    }
  `;

  function clickHandler(e) {
    dispatch({ type: "CHANGE_REGION", payload: e.target.value });
  }

  return (
    <div style={{textAlign: 'center'}}>
      <RegionHeader></RegionHeader>
      <p>Select your region to browse players. <br /> NOTE : You may only vote for one region.</p>
      <Regions>
        <Button onClick={clickHandler} value="tw">Taiwan</Button>
        <Button onClick={clickHandler} value="hk" className="inactive">Hong Kong</Button>
        <Button onClick={clickHandler} value="sea">South East Asia</Button>
        <Button onClick={clickHandler} value="jp">Japan</Button>
      </Regions>
      <PlayerList user={props.user} region={region} />
    </div>
  );
};

export default RegionSelection;
