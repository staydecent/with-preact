import {equal} from 'wasmuth'
import {subscribe, getState} from '/store'
import compose from '/util/compose'

/**
 * Mapper is called whenever the state changes.
 * Whenever the result of mapper changes, the component rerenders
 *
 * mapper: (state) => props this component needs from state
 * Component: the component that needs the props
 *
 * @TODO: Eventually move this to wasmuth
 */
export default mapper => Component => compose({
  componentWillMount () {
    const syncState = () => {
      const newProps = mapper(getState(), this.props)
      // _namespacedState is used to replace the state entirely.
      // Without it it's hard to handle keys that are removed in new state
      if (!equal(newProps, this.state._namespacedState)) {
        this.setState({_namespacedState: newProps})
      }
    }
    syncState()
    // for some reason this makes unsubscribe get passed in as a prop to render.
    this.unsubscribe = subscribe(syncState)
  },
  componentWillUnmount () {
    this.unsubscribe()
  },
  render ({unsubscribe, _namespacedState, ...props}) {
    return <Component {..._namespacedState} {...props} />
  }
})
