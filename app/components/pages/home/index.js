import {range} from 'wasmuth'

// Components
import Card from '/components/elements/card'
import Button from '/components/elements/button'
import Dropdown from '/components/elements/dropdown'
import {Row, Column} from '/components/elements/grid'
import Link from '/components/elements/link'

// State
const Home = ({url, modals = {}}) =>
  <div>
    <div style='max-width: 640px; margin: 1rem auto;'>
      <h1>Hello World</h1>
      <Card className='elevated hover-scale'>
        <p>{url}</p>
        <Link to='http://google.ca'>Google</Link>
        <Button to='http://news.ycombinator.com'>Hacker News</Button>
      </Card>
      <div class='spaced'>
        <h2>Dropdown</h2>
        <Dropdown>
          <ul>
            <li><a href=''>Hotdog</a></li>
            <li><a href=''>Cola</a></li>
            <li><a href=''>Fruit Smoothie</a></li>
            <li><a href=''>Dinasaur Egg</a></li>
          </ul>
        </Dropdown>
      </div>
      <Row><h2>Grid</h2></Row>
      <Row>{range(1, 4).map((n) =>
        <Column>
          <Card>{n}</Card>
        </Column>
      )}</Row>
      <Row>{range(4, 6).map((n) =>
        <Column>
          <Card>{n}</Card>
        </Column>
      )}</Row>
    </div>
  </div>

export default Home
