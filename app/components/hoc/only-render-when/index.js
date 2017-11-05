import {getState} from '/store'

export default condition => Component => props =>
  condition(getState(), props) ? <Component {...props} /> : null
