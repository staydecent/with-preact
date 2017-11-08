import Home from '/components/pages/home'
import Resource from '/components/pages/resource'
import Example from '/components/pages/examples'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  components: {
    path: '/examples',
    component: Example
  },
  resource: {
    path: '/resource/:id',
    component: Resource
  }
}

export default routes
