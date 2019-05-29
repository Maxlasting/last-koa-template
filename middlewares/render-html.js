const { join } = require('path')
const fs = require('fs')

const appPath = join(__dirname, '../apps/')

module.exports = app => app.use(async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.render = async page => {
    const ret = fs.createReadStream(join(appPath, page, 'index.html'))
    ctx.body = ret
  }
  await next()
})