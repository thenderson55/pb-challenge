import React from "react";
import { useStateValue } from "../context/store";
import Button from "./Button";
import styled from "styled-components";

export const RegionButtons = () => {
  const [{}, dispatch] = useStateValue();

  const Regions = styled.div`
    display: flex;
    margin: auto;
    width: 50%;
    flex-direction: row;
    justify-content: space-evenly;
    text-align: center;
    margin-top: 7px;
  `;

  function clickHandler(e) {
    dispatch({ type: "CHANGE_REGION", payload: e.target.value });
  }

  return (
    <Regions>
      <Button onClick={clickHandler} value="tw">Taiwan</Button>
      <Button onClick={clickHandler} value="hk" className="inactive">Hong Kong</Button>
      <Button onClick={clickHandler} value="sea">South East Asia</Button>
      <Button onClick={clickHandler} value="jp">Japan</Button>
    </Regions>
  )
}