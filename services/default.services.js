const send404PageHtmlFn = async (ctx) => {
  ctx.status = 404
  const html = await ctx.render('404')
  return html
}

module.exports = { send404PageHtmlFn }
