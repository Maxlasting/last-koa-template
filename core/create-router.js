const { prefixer, routerMap } = require('./varable.js')

const { change2Arr } = require('./utils.js')

const createRouter = (app, routesPath, routes) => {
  const path = require('path')
  const KoaRouter = require('koa-router')

  const router = new KoaRouter()

  routes.map(route => path.join(routesPath, route)).forEach(require)

  for (let [configs, controllers] of routerMap) {
    const { method, subPath, target } = configs

    router[method](path.posix.join(target[prefixer] + subPath), ...change2Arr(controllers))
  }

  app.use(router.routes()).use(router.allowedMethods())

  return router
}

module.exports = createRouter
