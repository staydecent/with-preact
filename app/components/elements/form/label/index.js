import BaseLabel from './base'

export const Label = ({name, formName, ...props}) =>
  BaseLabel({for: `${formName}-${name}`, ...props})

export default Label
