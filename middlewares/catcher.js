module.exports = app => app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(err)
    if (err.code === 302) {
      ctx.status = 302
      ctx.redirect(err.url)
    } else if (err.code === 404) {
      const html = await ctx.render('404')
      ctx.status = 404
      ctx.body = html
    } else {
      ctx.status = 500
      if (process.env.NODE_ENV === 'development') {
        console.error(err.message)
        ctx.body = err.message
      } else {
        const html = await ctx.render('500')
        ctx.body = html
      }
    }
  }
})
