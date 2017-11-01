import {route} from 'preact-router'
import {urlFor} from '/util/route'

const Components = () =>
  <div>
    <h1>Components</h1>
    <button onClick={() => route('/')} >home</button>
    <a href={urlFor(
      'components2',
      {
        args: {arg1: 'hellothere'},
        queries: {search: 'searchhhh'}
      },
    )}>
      Component with arg
    </a>
  </div>

export default Components
