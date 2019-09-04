const core = require('../core')

@core.prefix('/')
class _decorator_default_router_ {
  @core.get('*')
  async _route_00_ (ctx) {
    ctx.render('404')
  }
}
