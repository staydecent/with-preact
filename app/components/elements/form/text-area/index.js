import {dispatch} from '/store'
import {compose, setNodeName} from '/util/compose'
import {
  formSet as formSetBuilder,
  formRemove as formRemoveBuilder
} from '../actions.js'
import {fieldState} from '../selectors.js'
import BaseTextArea from './base'

export default compose(setNodeName('TextArea'), {
  componentWillMount () {
    this.formSet = formSetBuilder(this.props.formName)
    this.formRemove = formRemoveBuilder(this.props.formName)
  },
  render ({formName, formSet, formRemove, name, ...props}) {
    const {asyncError, touched, modified} = fieldState(
      formName,
      name
    )
    return BaseTextArea({
      onKeyUp: ev => {
        ev.preventDefault()
        dispatch(formSet(['data', name], ev.target.value))
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
