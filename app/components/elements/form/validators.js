export const validators = functions => value => {
  for (var i in functions) {
    let result = functions[i](value)
    if (result) {
      return result
    }
  }
}

export const minLength = length => value =>
  (!value || value.length < length) &&
  `Must be at least ${length} character${length === 1 ? '' : 's'} long.`

export const maxLength = length => value =>
  value && value.length > length &&
  `Can't be more than ${length} character${length === 1 ? '' : 's'} long.`

export const isEmail = value => {
  const re = /\S+@\S+\.\S+/
  return !re.test(value) && 'Must be a valid email'
}

export const required = value => !value && 'Required.'
