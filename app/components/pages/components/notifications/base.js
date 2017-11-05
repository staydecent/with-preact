import Notification from '/components/elements/notification'

export default ({id, didClickShowNotification, didClickShowGlobalNotification}) =>
  <div>
    <button onClick={didClickShowNotification}>Show Notification</button>
    <button onClick={didClickShowGlobalNotification}>Show Global Notification</button>
    <Notification id={id} />
  </div>
