import Link from '/components/elements/link'

const Home = ({url}) =>
  <div>
    <h1>Hello World</h1>
    <p>{url}</p>
    <Link to='http://google.ca'>Google</Link>
  </div>

export default Home
