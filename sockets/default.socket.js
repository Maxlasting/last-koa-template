module.exports = socket => {
  socket.on('join', () => {
    socket.emit('test', 'ok')
  })
}
