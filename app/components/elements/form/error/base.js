export default ({error, className = '', ...props}) =>
  error && <span className={`${className} field-error`}>{error}</span>
