const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  routes: [
    'default.route'
  ],
  middlewares: [
    'catch-errors',
    'favicon',
    'render-html',
    'body',
    'router'
  ],
  database: 'mongodb://127.0.0.1:27017/test'
}
