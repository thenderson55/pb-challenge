import React, { useContext, useState } from "react";
import Button from './Button'
import styled from 'styled-components'
import PlayerList from './PlayerList'
import{ MyContext, UpdateRegion } from "../context/MyContext";


const Regions = styled.div`
  display: flex;
  margin: auto;
  width: 50%;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  padding: 10px; 
`

const RegionSelection = () => {

  const [region, setRegion] = useState(null)

  // const { region, dispatch } = useContext(MyContext);

  function clickHandler (e) {
    setRegion(e.target.value)
    // dispatch({ type: "CHANGE_REGION", payload: e.target.value})
  }

  return (
    <div>
      <Regions>
        <Button onClick={clickHandler} value="tw">Taiwan</Button>
        <Button onClick={clickHandler} value="hk">Hong Kong</Button>
        <Button onClick={clickHandler} value="sea">South East Asia</Button>
        <Button onClick={clickHandler} value="jp">Japan</Button>
      </Regions>
      <PlayerList region={region}></PlayerList> 
    </div>

  )
}

export default RegionSelection
