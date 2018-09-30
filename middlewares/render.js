const { join } = require('path')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const appPath = join(__dirname, '../apps/')

module.exports = app => app.use(async (ctx, next) => {
  ctx.type = 'text/html'

  ctx.render = async (page) => {
    const html = await readFile(join(appPath, page, 'index.html'))
    return html
  }

  await next()
})
