import Portal from 'preact-portal'
import {some, diffObj} from 'wasmuth'

import {dispatch, watchPath} from '/store'
import {closeModal} from './actions'

// Watch for an open modal, if so add a class to body to prevent
// scrolling behind the modal.
watchPath(['modals'], (modals, oldModals = {}) => {
  const hasOpenModal = some((x) => x, modals)
  if (hasOpenModal) {
    const diff = Object.keys(diffObj(oldModals, modals))
    if (diff.length) {
      document.body.classList.add('modal-open')
    }
  } else {
    document.body.classList.remove('modal-open')
  }
})

const Modal = ({
  className = '',
  children
}) =>
  <Portal into='body'>
    <div
      class={'modal-container ' + className}
    >
      <div class='modal-content'>
        <div className='close' onClick={() => dispatch(closeModal)} >
          close
        </div>
        {children}
      </div>
    </div>
  </Portal>

export default Modal
