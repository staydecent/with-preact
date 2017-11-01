import {filter} from 'wasmuth'

const environments = {
  development: ['http://localhost:3333', 'http://localhost:3334'],
  staging: '[STAGING_URL]',
  production: '[PRODUCTION_URL]'
}

export const environment = (() => {
  const {host, protocol} = window.location
  const url = `${protocol}//${host}`
  const current = filter(
    (k) => {
      if (typeof environments[k] === 'object') {
        return filter(v => v === url, environments[k]).length > 0
      }
      return environments[k] === url
    },
    Object.keys(environments)
  )[0]
  if (!current) {
    throw new Error('No environment matching current url')
  }
  return current
})()
