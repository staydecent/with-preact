import {assoc, path, pathSet} from 'wasmuth'

import {TOGGLE_DROPDOWN, CLOSE_ALL_DROPDOWNS} from './actions'

const dropdownReducer = (state, {type, payload}) => {
  switch (type) {
    case TOGGLE_DROPDOWN:
      const newVal = !path(['_dropdowns', payload.uid], state)
      return pathSet(['_dropdowns'], {[payload.uid]: newVal}, state)

    case CLOSE_ALL_DROPDOWNS:
      return assoc('_dropdowns', {}, state)

    default:
      return state
  }
}

export default dropdownReducer
