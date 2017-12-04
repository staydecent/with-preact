import Home from '/components/pages/home'
import Components from '/components/pages/components'
import Resource from '/components/pages/resource'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  components: {
    path: '/components',
    component: Components
  },
  resource: {
    path: '/resource/:id',
    component: Resource
  }
}

export default routes
