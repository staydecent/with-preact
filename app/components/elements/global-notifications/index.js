import {pipe, filter} from 'wasmuth'
import {mapStateToProps} from '/store'
import BaseGlobalNotifications from './base'

export default pipe(
  mapStateToProps(
    state => ({
      notifications: Object.values(filter(
        ({id = ''}) => id.indexOf('global') === 0,
        state.notifications || {}
      ))
    })
  )
)(BaseGlobalNotifications)
