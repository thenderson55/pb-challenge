import React, { useState } from 'react'
import playersMock from '../data/players_teams'

const GlobalState = props => {
  const [players, setPlayers] = useState(playersMock)
  const [region, setRegion] = useState(null)

  const updateRegion = region => {
    setRegion(region)
  }
}