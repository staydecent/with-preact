import {dispatch, set} from '/store'
import compose from '/util/compose'
import request from '/util/request'
import Progress from '/components/elements/progress'

const fakeRequest = url => {
	var counter = 1
	const interval = window.setInterval(() => {
		dispatch(set(['requests', url, 'progress'], {loaded: counter, total: 100}))
		counter ++
		counter > 100 && window.clearInterval(interval)
	}, 100)
	return interval
}

const EXAMPLE_REQUEST = 'exampleurlforprogressexample'

export default compose({
  componentWillMount() {
    this.interval = fakeRequest(EXAMPLE_REQUEST)
  },
  componentWillUnmount() {
		clearInterval(this.interval)
	},
  render () {
    return <Progress request={EXAMPLE_REQUEST} />
  }
})
