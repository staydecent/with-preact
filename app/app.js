import {Router, defineRoutes} from '/util/route'

import Header from '/components/elements/header'
import Modals from '/components/modals'

import App from '/components/pages/app'

const routes = defineRoutes({
  app: {
    path: '/app',
    component: App
  }
})

const Main = () =>
  <div id='main'>
    <Header />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Main />, document.body, document.getElementById('main'))
