const body = require('koa-body')

module.exports = app => app.use(body({
  multipart: true, urlencoded: true, formidable: { maxFileSize: 10 * 10 * 1024 }
}))
