import {dispatch} from '/store'
import {openModal} from '/components/elements/Modal/actions'
import BaseComponents from './base'

export default () =>
  BaseComponents({
    openExampleModal: () => dispatch(openModal('Example'))
  })
