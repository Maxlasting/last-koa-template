require('@babel/register')

;(async function () {
  const Koa = require('koa')
  const app = new Koa()

  const config = require('./config')

  const path = require('path')

  const http = require('http')
  const server = http.createServer(app.callback())
  const io = require('socket.io')(server)

  io.on('connection', function (socket) {
    console.log('Socket has bin connect success!')
    config.sockets
      .map(s => path.join(__dirname, 'sockets', s))
      .forEach(_ => require(_)(socket))
  })

  config.middlewares
    .map(m => path.join(__dirname, 'middlewares', m))
    .forEach(_ => require(_)(app))

  const port = process.env.PORT || 3333

  server.listen(
    port,
    () => console.info(
      `Server is successfully running at port: ${port}!`
    )
  )
})();
