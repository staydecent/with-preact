export default ({submitting, submittingText, text, ...props}) =>
  <button {...props} >{submitting ? submittingText : text}</button>
