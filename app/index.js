import AsyncRoute from 'preact-async-route'

import loadScript from '/util/loadScript'
import {Router, defineRoutes} from '/util/route'

import Header from '/components/elements/header'
import Modals from '/components/modals'

import Home from '/components/pages/home'
import Resource from '/components/pages/resource'

const routes = defineRoutes({
  home: {
    path: '/',
    component: Home
  },
  // app: {
  //   path: '/app',
  //   getComponent: loadScript('app.js'),
  //   component: AsyncRoute
  // },
  resource: {
    path: '/resource/:id',
    component: Resource
  }
})

const Landing = () =>
  <div id='main'>
    <Header />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Landing />, document.body, document.getElementById('main'))
