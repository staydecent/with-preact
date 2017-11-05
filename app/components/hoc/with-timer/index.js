import compose from '/util/compose'

export default (timerDidFinish, time) => Component => compose({
  componentWillMount () {
    this.timeout = window.setTimeout(
      () => timerDidFinish(this.props),
      time(this.props)
    )
  },
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  },
  render (props) {
    return <Component {...props} />
  }
})
