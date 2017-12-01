import {guid} from 'wasmuth'

import {compose, setNodeName, watchPath} from '/util/compose'

import {dispatch, set} from '/store'

import render from './base'

const Carousel = compose(
  setNodeName('Carousel'),

  function init () {
    this._uid = guid()
    this.state = {active: this.props.active || 0}
    dispatch(set(['Carousel', this._uid], this.props.active || 0))
    watchPath(['Carousel', this._uid], (active) =>
      active !== this.state.active && this.setState({active})
    )
  },

  function next (ev) {
    ev.preventDefault()
    const n = this.state.active >= this.props.children.length - 1
      ? 0
      : this.state.active + 1
    dispatch(set(['Carousel', this._uid], n))
  },

  function prev (ev) {
    ev.preventDefault()
    const n = this.state.active <= 0
      ? this.props.children.length - 1
      : this.state.active - 1
    dispatch(set(['Carousel', this._uid], n))
  },

  function getWidth (ref) {
    if (!ref) return
    this.width = ref.offsetWidth
  },

  function getStyle (idx, active) {
    return idx === 0 && idx !== active
      ? `margin-left: -${this.width * active}px;`
      : ''
  },

  render
)

export default Carousel
