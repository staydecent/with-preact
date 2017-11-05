import {without} from 'wasmuth'
import {set, getState} from '/store'

export const showNotification = ({error, success, warning, id, time = 4}) =>
  set(['notifications', id], {error, success, warning, id, time})

export const hideNotification = id =>
  set(['notifications'], without([id], getState().notifications || {}))
