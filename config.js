module.exports = {
  middlewares: [
    'catcher',
    'favicon',
    'render',
    'cors',
    'body',
    'send',
    'create-router',
  ],
  routes: [
    'default.route'
  ],
  sockets: [
    'default.socket'
  ]
}
