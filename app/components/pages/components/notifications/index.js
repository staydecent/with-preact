import {showNotification} from '/components/elements/notification/actions'
import {dispatch} from '/store'
import BaseNotification from './base'

export default () =>
  BaseNotification({
    id: 'exampleNotification',
    didClickShowNotification: (ev) =>
      ev.preventDefault() || dispatch(showNotification({
        success: 'Example notification!',
        time: 5000,
        id: 'exampleNotification'
      })),
    didClickShowGlobalNotification: (ev) =>
      ev.preventDefault() || dispatch(showNotification({
        success: 'Example notification!',
        time: 5000,
        id: 'global-exampleNotification'
      }))
  })
