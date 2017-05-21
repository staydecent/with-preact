import Link from '/components/elements/link'
import Button from '/components/elements/button'

const Home = ({url}) =>
  <div>
    <h1>Hello World</h1>
    <p>{url}</p>
    <Link to='http://google.ca'>Google</Link>
    <Button to='http://news.ycombinator.com'>Hacker News</Button>
  </div>

export default Home