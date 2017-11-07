import {path} from 'wasmuth'
import {dispatch, getState} from '/store'
import BaseTextInput from './base'
import {compose, setNodeName} from '/util/compose'
import mapStateToProps from '/util/mapStateToProps'
import {formSet as formSetBuilder, formRemove as formRemoveBuilder} from '../actions.js'
import {fieldState} from '../selectors.js'

export default compose(setNodeName('TextInput'), {
  componentWillMount () {
    this.formSet = formSetBuilder(this.props.formName)
    this.formRemove = formRemoveBuilder(this.props.formName)
  },
  render ({name, className = '', formSet, formRemove, formName, ...props}) {
    const {value, error, asyncError, touched, focus, modified} = fieldState(
      formName,
      name
    )
    return BaseTextInput({
      type: 'text',
      value,
      id: `${formName}-${name}`,
      className: `${!!(error || asyncError) && !!touched && !focus && 'error'} ${className}`,
      onInput: ev => {
        ev.preventDefault()
        value != ev.target.value && dispatch(formSet(['data', name], ev.target.value))
        !modified && dispatch(formSet(['modified', name], true))
        asyncError && dispatch(formRemove(['asyncErrors', name]))
      },
      onFocus: ev => {
        !touched && dispatch(formSet(['touched', name], true))
        dispatch(formSet(['focus', name], true))
      },
      onBlur: ev => {
        dispatch(formSet(['focus', name], false))
      },
      ...props
    })
  }
})
