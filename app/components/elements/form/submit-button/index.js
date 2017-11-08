import {path} from 'wasmuth'
import {getState, dispatch} from '/store'
import {formSet} from '../actions'
import BaseSubmitButton from './base'

export const SubmitButton = ({
  formName,
  disabled = false,
  disableWhenUnmodified = false,
  ...props
}) => {
  const formState = path(['forms', formName], getState()) || {}
  const submitting = formState.submitting || false
  const hasError = Object.keys(formState.errors || {}).length > 0
  const hasAsyncErrors = Object.keys(formState.asyncErrors || {}).length > 0
  const wasModified = Object.keys(formState.modified || {}).length > 0

  return BaseSubmitButton({
    onClick: ev => {
      ev.preventDefault()
      dispatch(formSet(formName)(['submit'], true))
    },
    disabled: disabled || submitting || hasError || hasAsyncErrors ||
      (disableWhenUnmodified && !wasModified),
    submitting: submitting,
    ...props
  })
}

export default SubmitButton

// export const SubmitButton = ({
//   disabled = false,
//   disableWhenUnmodified = false,
//   formName,
//   ...props
// }) => {
//   const formState = pathOr({}, ['forms', formName], getState())
//   const submitting = formState.submitting || false
//   const hasError = Object.keys(formState.errors || {}).length > 0
//   const hasAsyncErrors = Object.keys(formState.asyncErrors || {}).length > 0
//   const wasModified = Object.keys(formState.modified || {}).length > 0
//   return (
//     <BaseSubmitButton
//       disabled={
//         disabled ||
//           submitting ||
//           hasError ||
//           hasAsyncErrors ||
//           (disableWhenUnmodified && !wasModified)
//       }
//       onClick={ev => {
//         ev.preventDefault()
//         dispatch(formSet(formName, ['submit'], true))
//       }}
//       submitting={submitting}
//       {...props}
//     />
//   )
// }
