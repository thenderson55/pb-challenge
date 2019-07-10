import { createContext } from 'react'
import playersMock from '../data/players_teams'

const playersContext = createContext({
  players: playersMock,
  region: null,
  changeRegion: (region) => {}
})

export default playersContext