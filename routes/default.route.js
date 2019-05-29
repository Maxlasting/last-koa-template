const core = require('../core/index.js')
const createData = require('../utils/create-data.js')

@core.prefix('/')
class __decorator_default_router__ {
  @core.get('/test')
  async _route_01_ (ctx) {
    const data = await createData(async () => {
      return 'ok'
    })
    ctx.body = data
  }
}
