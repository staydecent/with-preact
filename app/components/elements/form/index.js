import emailRegex from 'email-regex'
import {debounce as debounceFunction} from 'throttle-debounce'

import {set, update, dispatch, mapStateToProps} from '/store'

const {cloneElement} = Preact

const validateEmail = (formName, field = 'email') => debounceFunction(200, (email) => {
  if (email.length < 4) return
  if (!emailRegex({exact: true}).test(email)) {
    dispatch(set(['formErrors', formName, field], 'Please enter a valid Email Address'))
  } else {
    dispatch(set(['formErrors', formName, field], null))
  }
})

const validatePassword = (formName, field = 'password') => debounceFunction(200, (password = '', {min}) => {
  if (password.length > 3 && password.length < min) {
    dispatch(set(['formErrors', formName, field], `Password should be at least ${min} characters`))
  } else {
    dispatch(set(['formErrors', formName, field], null))
  }
})

const handleValidations = (formName, name, type, rules, value) =>
  (type === 'email' && validateEmail(formName, name)(value)) ||
  (type === 'password' && rules.min && validatePassword(formName, name)(value, rules))

const updateProps = (children, {formName, data, errors}) => {
  const names = ['TextField', 'RadioField', 'Radio']
  for (var x = 0; x < children.length; x++) {
    if (children[x].nodeName && names.indexOf(children[x].nodeName.name) > -1) {
      const name = children[x].attributes.name
      children[x] = cloneElement(children[x], {
        formName,
        value: data[name],
        error: errors[name]
      })
    }
    if (children[x].children && children[x].children.length) {
      children[x].children = updateProps(children[x].children, {formName, data, errors})
    }
  }
  return children
}

export const Form = mapStateToProps(
  ({forms = {}, formErrors = {}, formState = {}}, {name, ...props}) => ({
    name,
    data: forms[name] || {},
    errors: formErrors[name] || {},
    state: formState[name] || {},
    ...props
  })
)(({
  name,
  data,
  errors,
  state,
  onSubmit,
  children,
  ...props
}) => {
  const childrenWithProps = updateProps(children, {formName: name, data, errors})
  return (
    <form onSubmit={ev => ev.preventDefault() || onSubmit({data, errors})} {...props}>
      {childrenWithProps}
    </form>
  )
})

export const Field = ({
  label,
  className = '',
  name,
  hint,
  error,
  children,
  ...props
}) =>
  <div>
    {className.indexOf('fancy-label') !== -1 &&
      <div className='label-wrap'>
        {children}
        {label && <label htmlFor={name}>
          <div>{label}</div>
        </label>}
      </div>}

    {className.indexOf('fancy-label') === -1 &&
      <div>
        {label && <label htmlFor={name}>
          <div>{label}</div>
        </label>}
        {children}
      </div>}

    {!!hint && !error &&
      <div className='field-hint'>{hint}</div>}
    {!!error &&
      <div className='field-hint is-error'>{error}</div>}
  </div>

// @TODO: TextField should mapState, or watchPath to show errors etc. rather
// than rely on Form passing error down.
export const TextField = ({
  type = 'text',
  name,
  placeholder = ' ',
  debounce = 0,
  focus = false,
  rules = {},
  // Assigned by updateProps
  formName,
  value,
  ...props
}) =>
  <Field name={name} {...props}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onInput={debounceFunction(debounce, (ev) =>
        ev.preventDefault() ||
        handleValidations(formName, name, type, rules, ev.target.value) ||
        dispatch(update(['forms', formName], {[name]: ev.target.value}))
      )}
      // setTimeout is needed to wait till after the animation
      // @TODO: Probably better to use requestAnimationFrame
      ref={(ref) => ref && focus && setTimeout(() => ref.focus(), 100)}
      {...props}
    />
  </Field>

export const RadioField = ({name, label, value, checked, formName, ...props}) =>
  <Field label={name} name={name} {...props}>
    <input
      type='radio'
      name={name}
      checked={checked}
      onChange={(ev) =>
        ev.preventDefault() ||
        dispatch(update(['forms', formName], {[name]: value}))
      }
      {...props}
    />
  </Field>

export const Radio = ({name, val, value, formName, ...props}) =>
  <input
    type='radio'
    name={name}
    checked={val === value}
    onChange={(ev) =>
      ev.preventDefault() ||
      dispatch(update(['forms', formName], {[name]: val}))
    }
    {...props}
  />
