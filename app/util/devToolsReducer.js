// TODO: check environment, only development
const withDevTools = !!window.devToolsExtension

export const devToolsReducer = (() => {
  if (withDevTools) {
    const devTools = window.devToolsExtension.connect()
    return (action, state) => {
      devTools.send(action, state)
      return state
    }
  }
  return (action, state) => state
})()
