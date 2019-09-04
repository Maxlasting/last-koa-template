module.exports = app => app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      success: false,
      msg: err.message ? err.message : '错误的请求或请求无法被完成!'
    }
  }
})
