import {set, remove} from '/store'

export const formSet = formName => (path, value) =>
  set(['forms', formName, ...path], value)

export const formRemove = formName => (path = []) =>
  remove(['forms', formName, ...path])
