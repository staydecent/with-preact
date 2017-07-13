import Portal from 'preact-portal'

import {compose, withState, setNodeName} from '/util/compose'

const Modal = compose(
  setNodeName('Modal'),
  withState('open', 'setOpen', (props) => console.log('props', props) || !!props.open),
  function close () {
    this.setOpen(false)
  },
  function render ({close, open, children}) {
    console.log('modal', open)
    return open
      ? (
        <Portal into='body'>
          <div class='modal-overlay' onclick={() => close()}>
            <div class='modal'>{children}</div>
          </div>
        </Portal>
      )
      : null
  }
)

export default Modal
