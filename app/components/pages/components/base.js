import Notifications from './notifications'

export default ({openExampleModal}) =>
  <div>
    <h1>Modals</h1>
    <button onClick={openExampleModal}>Open Modal</button>
    <hr />
    <h1>Dropdown</h1>
    <hr />
    <h1>Notifications</h1>
    <Notifications />
    <hr />
  </div>
