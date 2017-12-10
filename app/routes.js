import Home from '/components/pages/Home'
import Resource from '/components/pages/Resource'
import Guide from '/components/pages/Guide'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  guide: {
    path: '/guide',
    component: Guide
  },
  resource: {
    path: '/resource/:id',
    component: Resource
  }
}

export default routes
