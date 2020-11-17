import * as type from '../const'

const initialState = {
  calcList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case type.CALC_LIST: {
      const calcList = [...state.calcList]
      calcList[action.index] = action.value
      return {
        ...state,
        calcList
      }
    }
    default:
      return state
  }
}
