import {map} from 'wasmuth'

import Link from '/components/elements/link'


export default function render ({
  active,
  prev,
  next,
  className = 'carousel-slide',
  getWidth,
  getStyle,
  children
}) {
  return <div className='carousel-block carousel'>
    <div className='card-carousel-content row'>
      <nav>
        <Link to={prev} className='carousel-btn left' />
      </nav>
      <div className='slides'>
        {map((c, idx) =>
          <div
            ref={(ref) => idx === 0 && getWidth(ref)}
            style={getStyle(idx, active)}
            class={`${className}${idx === active ? ' active' : ''}`}
          >{c}</div>
        , children)}
      </div>
      <nav>
        <Link to={next} className='carousel-btn right' />
      </nav>
    </div>
  </div>
}
