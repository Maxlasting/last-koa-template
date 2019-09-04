module.exports = app => app.use(async (ctx, next) => {
  ctx.send = (data) => {
    const res = { success: true, msg: '' }
    if (data) res.data = data
    ctx.body = res
  }
  await next()
})
