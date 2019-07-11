import React, { useContext, useState, useReducer } from "react";
import Button from './Button'
import styled from 'styled-components'
import PlayerList from './PlayerList'
import playersContext  from "../context/playersContext";
import playersReducer from '../context/playersReducer'
import { CHANGE_REGION } from '../context/types'

const Regions = styled.div`
  display: flex;
  margin: auto;
  width: 50%;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
`

const RegionHeader = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

const RegionSelection = (props) => {
  // const [state, dispatch] = useReducer(playersReducer, initialState)
  const [region, setRegion] = useState('hk')


  function clickHandler (e) {
    setRegion(e.target.value)
    // dispatch({ type: CHANGE_REGION, 
    //   payload: e.target.value})
    // e.target.disabled = true
  }

  return (
    <div>
      <RegionHeader>Vote for players to represent your region's team</RegionHeader>
      <p>Select your region to browse players. <br/> NOTE : You may only vote for one region.</p>
      <Regions>
        <Button onClick={clickHandler} value="tw">Taiwan</Button>
        <Button onClick={clickHandler} value="hk" className="inactive">Hong Kong</Button>
        <Button onClick={clickHandler} value="sea">South East Asia</Button>
        <Button onClick={clickHandler} value="jp">Japan</Button>
      </Regions>
      <PlayerList user={props.user} region={region}></PlayerList> 
    </div>

  )
}

export default RegionSelection
