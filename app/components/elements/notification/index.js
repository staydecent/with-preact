import {pipe, path} from 'wasmuth'
import mapStateToProps from '/util/mapStateToProps'
import withTimer from '/components/hoc/with-timer'
import mapProps from '/components/hoc/map-props'
import onlyRenderWhen from '/components/hoc/only-render-when'
import {dispatch} from '/store'
import {hideNotification} from './actions'
import BaseNotification from './base'

export default pipe(
  mapProps(props => ({
    didClickNotification: () => dispatch(hideNotification(props.id)),
    ...props
  })),
  withTimer(
    ({id}) => dispatch(hideNotification(id)),
    ({time}) => time
  ),
  onlyRenderWhen((state, {id}) => !!path(['notifications', id], state)),
  mapStateToProps((state, {id}) => path(['notifications', id], state))
)(BaseNotification)
