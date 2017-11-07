import {path} from 'wasmuth'
import {getState} from '/store'

export const fieldState = (form, field) => {
  const formState = path(['forms', form], getState()) || {}
  return {
    value: path(['data', field], formState),
    error: path(['errors', field], formState),
    asyncError: path(['asyncErrors', field], formState),
    touched: path(['touched', field], formState),
    focus: path(['focus', field], formState),
    modified: path(['modified', field], formState)
  }
}
