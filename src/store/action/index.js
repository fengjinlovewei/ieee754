import * as type from '../const'

export function setCalcList({index, value}) {
  return {
    type: type.CALC_LIST,
    index,
    value
  }
}

