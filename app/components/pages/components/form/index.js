import {validators, minLength, maxLength} from '/components/elements/form/validators'
import BaseForm from './base'

export default ({}) => BaseForm({
  onSubmit: (data, onSuccess, onError) => {
    window.setTimeout(() => onError({fieldErrors: {fullName: 'Async error example'}}), 3000)
  },
  validations: {
    fullName: validators([
      minLength(11),
      maxLength(11),
      value => value && value[0] !== 'D' && 'Must start with "D".',
      value => value && value.indexOf('ale Cooper') === -1 && 'Must end with "ale Cooper".'
    ])
  }
})
