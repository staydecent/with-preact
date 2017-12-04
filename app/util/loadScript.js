import load from 'load-script2'

const LOADED = []

const loadScript = (name) => () => {
  if (LOADED.indexOf(name) > -1) return
  load(name, (err, script) =>
    !err && LOADED.push(name))
}

export default loadScript
