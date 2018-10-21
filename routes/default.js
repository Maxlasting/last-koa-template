const fs = require('fs')
const { join } = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const send = require('koa-send')
const LRU = require('lru-cache')
const { prefix, get } = require('../decorators')

const createRenderer = (bundle, options) => createBundleRenderer(
  bundle,
  Object.assign(
    {
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      runInNewContext: false
    },
    options
  )
)

const templatePath = join(__dirname, '../apps/client/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const bundle = require('../apps/client/dist/vue-ssr-server-bundle.json')
const clientManifest = require('../apps/client/dist/vue-ssr-client-manifest.json')

const renderer = createRenderer(bundle, {
  template,
  clientManifest
})

@prefix('/')
class _defaultRouter_ {
  @get('/dist/*')
  async _sendStaticFiles (ctx) {
    await send(ctx, ctx.path, { root: join(__dirname, '../apps/client') })
  }

  @get('*')
  async _serverRender (ctx) {
    ctx.set('Content-Type', 'text/html')

    const context = {
      url: ctx.url
    }

    const html = await renderer.renderToString(context)

    ctx.body = html
  }
}
