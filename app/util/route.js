import {equals} from 'ramda'
import PreactRouter from 'preact-router'
import {map, reduce} from 'wasmuth'
import compose from '/util/compose'
import {set, dispatch, getState} from '/store'
import {routes} from '/routes'

const {cloneElement} = Preact

/**
 * Use instaed of preact-router Router component.
 * All children should be Route components (defined below).
 * - Add key prop to Route children so that when route changes,
 *   the current route component will unmount and the new one will mount.
 * - Add path prop to Route children based on their name props.
 */
export const Router = ({children, routes, ...props}) =>
  <PreactRouter {...props}>
    {map((route, i) => cloneElement(route, {
      key: i,
      path: routes[route.attributes.name].path
    }), children)}
  </PreactRouter>

/**
 * Add preact-router props into the atom state
 */
export const Route = compose({
  componentWillMount () {
    const currentValues = getState().route
    const newValues = {
      args: this.props.matches,
      url: window.location.pathname,
      name: this.props.name
    }
    if (!equals(currentValues, newValues)) {
      dispatch(set('route', newValues))
    }
  },
  render ({component: Component}) {
    return <Component />
  }
})

/**
 * Get the path string for the route with name `name`
 * Best understood with an example:
 *
 * ```
 * const routes = {
 *  myRoute: '/some/:fancy/:route'
 * }
 *
 * urlFor('myRoute', {
 *   args: {fancy: 12, route: 'r2d2'},
 *   queries: {search: 'hi'}
 * })
 * > '/some/12/r2d2?search=hi'
 * ```
 */
export const urlFor = (name, {args = {}, queries = {}} = {}) => {
  const rule = routes[name]
  const replaced = reduce(
    (acc, k) => acc.replace(`:${k}`, args[k]),
    rule.path,
    Object.keys(args)
  )
  return `${replaced}${queryString(queries)}`
}

/**
 * Turn object of queries into querystring.
 *
 * ```
 * queryString({search: 'hi', user: 3})
 * > '?search=hi&user=3'
 * ```
 */
const queryString = queries => {
  if (Object.keys(queries).length > 0) {
    const encoded = map(
      (key, value) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      queries
    )
    return `?${Object.values(encoded).join('&')}`
  }
  return ''
}
