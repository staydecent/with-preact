import {map, range} from 'wasmuth'

// Components
import Carousel from '/components/elements/carousel'
import Card from '/components/elements/card'
import Dropdown from '/components/elements/dropdown'
import {
  Form,
  TextField
} from '/components/elements/form'
import {Row, Column} from '/components/elements/grid'
import Page from '/components/elements/page'

const Home = ({url, modals = {}}) =>
  <Page>

    <div className='intro' style='max-width: 640px; margin: 1rem auto;'>
      <h1>Hello World</h1>
      <Card className='elevated hover-scale'>
        <p>{url}</p>
        <a href='http://google.ca'>Google</a>
        <a className='btn' href='http://news.ycombinator.com'>Hacker News</a>
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

    <Card className='spaced'>
      <Form>
        <h2>Sign In</h2>
        <p>Sign in to your account below.</p>

        <TextField placeholder='Your Email' name='email' />
        <TextField placeholder='Your Password' name='pass' />

        <button type='submit' className='btn'>Sign In</button>
      </Form>
    </Card>

    <div className='spaced'>
      <Carousel>
        {map((hex) =>
          <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} />
        , ['fff', 'a7c', '09d', '411', '111'])}
      </Carousel>
    </div>

  </Page>

export default Home
