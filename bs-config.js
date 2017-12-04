const historyApiFallback = require('connect-history-api-fallback')

module.exports = {
  files: ['public/*'],
  server: {
    baseDir: 'public/'
  },
  port: 3333,
  logLevel: 'debug',
  middleware: [historyApiFallback()]
}
