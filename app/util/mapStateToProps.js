import {equal} from 'wasmuth'
import {subscribe, getState} from '/store'
import compose from '/util/compose'

/**
 * Mapper is called whenever the state changes.
 * Whenever the result of mapper changes, the component rerenders
 *
 * mapper: (state) => props this component needs from state
 * Component: the component that needs the props
 */
export default mapper => Component => compose({
  componentWillMount() {
    const syncState = () => {
      const newProps = mapper(getState())
      if (!equal(newProps, this.state)) {
        this.setState({...newProps})
      }
    }
    syncState()
    this.unsubscribe = subscribe(syncState)
  },
  componentWillUnmount() {
    this.unsubscribe()
  },
  render(props) {
    return <Component {...props} />
  }
})
