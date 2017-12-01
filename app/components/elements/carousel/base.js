import {map} from 'wasmuth'

import Link from '/components/elements/link'


export default function ({
  active,
  prev,
  next,
  className = 'carousel-slide',
  getWidth,
  getStyle,
  children
}) =>
  <div className={`carousel`}>
    <div className='slides'>
      {map((c, idx) =>
        <div
          ref={(ref) => idx === 0 && getWidth(ref)}
          class={`${className}${idx === active ? ' active' : ''}`}
          style={getStyle(idx, active)}
        >{c}</div>
      , children)}
    </div>
    <nav>
      <Link to={prev} className='carousel-btn left' />
      <Link to={next} className='carousel-btn right' />
    </nav>
  </div>
