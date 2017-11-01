// TODO: check environment, only development
export const withDevTools = window.devToolsExtension

export const devToolsStore = (reducers, initialState) => {
  const reducer = (state, action) => {
    var len = reducers.length
    var newState = state
    var ret
    if (action.type === '@@INIT') {
      return state
    }
    for (var x = 0; x < len; x++) {
      newState = reducers[x](action, newState)
    }
    return newState
  }

  return window.__REDUX_DEVTOOLS_EXTENSION__(reducer, initialState)
}
