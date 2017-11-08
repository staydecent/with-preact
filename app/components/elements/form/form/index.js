import {cloneElement} from 'preact'
import {path, reduce, equal} from 'wasmuth'
import {dispatch} from '/store'
import {
  formSet as formSetBuilder,
  formRemove as formRemoveBuilder
} from '../actions.js'
import compose from '/util/compose'
import mapStateToProps from '/util/mapStateToProps'
import BaseForm from './base'

export default mapStateToProps(
  (state, {name}) => path(['forms', name], state)
)(compose({
  componentWillMount () {
    this.formSet = formSetBuilder(this.props.name)
    this.formRemove = formRemoveBuilder(this.props.name)
  },
  componentWillUnmount () {
    !this.props.keepFormDataOnUnmount && dispatch(this.formRemove())
  },
  componentWillUpdate ({
    initialData,
    validations = {},
    onSubmit,
    name,
    data,
    initialized,
    asyncErrors,
    submit,
    errors: existingErrors
  }) {
    if (!initialized) {
      dispatch(this.formSet(['initialized'], true))
      dispatch(this.formSet(['data'], initialData))
    }

    if (submit) {
      dispatch(this.formSet(['submit'], false))
      dispatch(this.formSet(['submitting'], true))
      onSubmit(data, onSuccess(name), onError(name))
    }

    const errors = validate(data || {}, validations)
    if (!equal(errors, existingErrors)) {
      dispatch(this.formSet(['errors'], errors))
      asyncErrors && dispatch(this.formRemove(['asyncErrors']))
    }
  },
  render ({formSet, name, children, ...props}) {
    return BaseForm({
      onSubmit: ev => ev.preventDefault() || dispatch(formSet(['submit'], true)),
      children: addFormNameToChildren(children, name),
      ...props
    })
  }
}))

const validate = (data, validations) =>
  reduce(
    (acc, key) => {
      const validation = validations[key](data[key])
      return validation
        ? {[key]: validations[key](data[key]), ...acc}
        : acc
    },
    {},
    Object.keys(validations)
  )

const addFormNameToChildren = (children, formName) => {
  const names = ['TextInput', 'Label', 'Error', 'SubmitButton', 'TextArea', 'Select']
  for (var x = 0; x < children.length; x++) {
    if (children[x] && children[x].nodeName &&
      names.indexOf(children[x].nodeName.name) > -1 &&
      !path(['attributes', 'formName'], children[x])) {
      children[x] = cloneElement(children[x], {formName})
    }
    if (children[x] && children[x].children && children[x].children.length) {
      children[x].children = addFormNameToChildren(children[x].children, formName)
    }
  }
  return children
}

const onSuccess = formName => ({
  clearAllFormData = true,
  clearMeta = false
}) => {
  const formSet = formSetBuilder(formName)
  const formRemove = formRemoveBuilder(formName)
  if (clearAllFormData) {
    dispatch(formRemove())
  } else if (clearMeta) {
    dispatch(formRemove(['modified']))
    dispatch(formRemove(['touched']))
  } else {
    dispatch(formSet(formName, ['submitting'], false))
  }
}

const onError = formName => ({fieldErrors = {}}) => {
  const formSet = formSetBuilder(formName)
  dispatch(formSet(['submitting'], false))
  dispatch(formSet(['asyncErrors'], fieldErrors))
}
