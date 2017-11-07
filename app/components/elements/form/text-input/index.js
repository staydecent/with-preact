import BaseTextInput from './base'
import {formSet as formSetBuilder, formRemove as formRemoveBuilder} from '../actions.js'

export default ({formName, name, className, isChildOfForm, ...props}) => {
  const formState = path(['forms', formName], getState()) || {}
  const formSet = formSetBuilder(formName)
  const formRemove = formRemoveBuilder(formName)
  const value = path(['data', name], formState)
  const error = path(['errors', name], formState)
  const asyncError = path(['asyncErrors', name], formState)
  const touched = path(['touched', name], formState)
  const focus = path(['focus', name], formState)
  const modified = path(['modified', name], formState)
  return BaseTextInput({
    type: 'text',
    value,
    className: `${(error || asyncError) && touched && !focus && 'error'} ${className}`,
    onInput: ev => {
      ev.preventDefault()
      dispatch(
        formSet(['data', name], ev.target.value),
        ...!modified && [formSet(['modified', name], true)],
        formRemove(['asyncErrors', name])
      )
    },
    onFocus: ev => {
      dispatch(
        formSet(['touched', name], true),
        formSet(['focus', name], true)
      )
    },
    onBlur: ev => {
      dispatch(formSet(['focus', name], false))
    },
    ...props
  })
}
