import {reject} from 'wasmuth'
import {dispatch} from '/store'
import BaseTextInput from './base'
import {compose, setNodeName} from '/util/compose'
import {
  formSet as formSetBuilder,
  formRemove as formRemoveBuilder
} from '../actions.js'
import {fieldState} from '../selectors.js'

export default compose(setNodeName('TextInput'), {
  componentWillMount () {
    this.formSet = formSetBuilder(this.props.formName)
    this.formRemove = formRemoveBuilder(this.props.formName)
  },
  render ({name, className = '', formSet, formRemove, formName, type = 'text', ...props}) {
    const {value, error, asyncError, touched, focus, modified} = fieldState(
      formName,
      name
    )
    return BaseTextInput({
      value,
      className: `${!!(error || asyncError) && !!touched && !focus && 'error'} ${className}`,
      onFocus: ev => {
        !touched && dispatch(formSet(['touched', name], true))
        dispatch(formSet(['focus', name], true))
      },
      onBlur: ev => dispatch(formSet(['focus', name], false)),
      type,
      ...type === 'checkbox' && checkboxProps(formSet, name, props.value, value),
      ...type === 'radio' && radioProps(formSet, name, props.value, value),
      ...type !== 'radio' && type !== 'checkbox' && textProps(formSet, formRemove, name, value, modified, asyncError),
      ...props
    })
  }
})

const textProps = (formSet, formRemove, name, value, modified, asyncError) => ({
  onInput: ev => {
    ev.preventDefault()
    value !== ev.target.value && dispatch(formSet(['data', name], ev.target.value))
    !modified && dispatch(formSet(['modified', name], true))
    asyncError && dispatch(formRemove(['asyncErrors', name]))
  }
})

const radioProps = (formSet, name, value, currentValue) => ({
  type: 'radio',
  onInput: ev => console.log('radio input'),
  onChange: ev => {
    ev.preventDefault()
    dispatch(formSet(['data', name], ev.target.value))
    dispatch(formSet(['modified', name], true))
  },
  checked: value === currentValue
})

const checkboxProps = (formSet, name, value, currentValue) => ({
  type: 'checkbox',
  onChange: ev => {
    ev.preventDefault()
    dispatch(formSet(['data', name], addOrRemove(value, currentValue || [])))
    dispatch(formSet(['modified', name], true))
  },
  checked: (currentValue || []).indexOf(value) > -1
})

const addOrRemove = (value, array) =>
  array.indexOf(value) === -1
    ? [...array, value]
    : reject(v => v === value, array)
