import {path} from 'wasmuth'
import mapStateToProps from '/util/mapStateToProps'
import BaseProgress from './base'

export default mapStateToProps((state, {request}) => {
  const {loaded, total} = path(['requests',request, 'progress'], state) || {loaded: -1, total: -1}
  return {
    progress: loaded === -1 ? null : loaded / total,
  }
})(({progress}) => <BaseProgress progress={progress} />)
