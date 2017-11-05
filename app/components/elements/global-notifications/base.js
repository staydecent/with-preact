import {map} from 'wasmuth'
import Notification from '/components/elements/notification'

export default ({notifications}) =>
  <div>
    {map(n => <Notification key={n.id} {...n} />, notifications)}
  </div>
