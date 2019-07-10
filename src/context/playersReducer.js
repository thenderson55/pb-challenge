import { CHANGE_REGION } from './types'

const changeRegion = (region, state) => {
  const newRegion = region
  return {
    ...state,
    region: newRegion
  }
}

export default (state, action) => {
  switch(action.type){
    case CHANGE_REGION:
      return changeRegion(action.payload, state)
    default:
      return state
  }
}