import {cloneElement} from 'preact'
import {compose, setNodeName} from '/util/compose'
import {dispatch} from '/store'
import {formSet as formSetBuilder} from '../actions.js'
import {fieldState} from '../selectors.js'
import {Select as BaseSelect, Option as BaseOption} from './base'

export const Option = BaseOption

export const Select = compose(setNodeName('Select'), {
  componentWillMount () {
    this.formSet = formSetBuilder(this.props.formName)
  },
  render ({
    formSet,
    formName,
    name,
    children = [],
    ...props
  }) {
    const {value, error, touched, modified} = fieldState(
      formName,
      name
    )
    const optionsWithSelected = (() => {
      for (var x = 0; x < children.length; x++) {
        if (children[x] && children[x].nodeName &&
          children[x].nodeName.name === 'Option' &&
          children[x].attributes.value === value) {
          children[x] = cloneElement(children[x], {selected: true})
          return children
        }
      }
      return children
    })()

    return BaseSelect({
      onInput: ev => {
        ev.preventDefault()
      },
      onChange: ev => {
        ev.preventDefault()
        dispatch(formSet(['data', name], ev.target.value))
        dispatch(formSet(['modified', name], true))
      },
      onFocus: ev => {
        dispatch(formSet(['touched', name], true))
      },
      value,
      className: error && touched && modified && 'error',
      children: optionsWithSelected,
      ...props
    })
  }
})
