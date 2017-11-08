import {fieldState} from '../selectors'
import BaseError from './base'

export const Error = ({formName, name, ...props}) => {
  const {error, asyncError, focus, touched} = fieldState(formName, name)
  return BaseError({
    error: touched && !focus && (error || asyncError),
    ...props
  })
}

export default Error
