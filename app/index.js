import {Router} from '/util/route'

import Header from '/components/elements/Header'
import Modals from '/components/Modals'

import routes from '/routes'

const Main = () =>
  <div>
    <Header />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Main />, document.body)
