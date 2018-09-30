const { prefix, get } = require('../decorators')
const { send404PageHtmlFn } = require('../services/default.services.js')

@prefix('/')
class _defaultRouter_ {
  @get('*')
  async _send404PageHtmlFn (ctx) {
    const html = await send404PageHtmlFn(ctx)
    ctx.body = html
  }
}
