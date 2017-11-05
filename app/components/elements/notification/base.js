export default ({
  className,
  error,
  success,
  warning,
  time,
  didClickNotification
}) => {
  const type = (error && 'error') || (success && 'success') || (warning && 'warning')
  return <div
    className={`global-notification ${type}`}
    onClick={didClickNotification}
  >
    <span>{error || success || warning}</span>
  </div>
}
