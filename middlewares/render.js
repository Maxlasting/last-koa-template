const { join } = require('path')
const fs = require('fs')

const htmlPath = join(__dirname, '..', 'html')

module.exports = app => app.use(async (ctx, next) => {
  console.log('123')
  ctx.type = 'text/html'
  ctx.render = async page => {
    const ret = fs.createReadStream(join(htmlPath, page, 'index.html'))
    ctx.body = ret
  }
  await next()
})
