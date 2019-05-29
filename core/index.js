const methods = ['get', 'post', 'del', 'put']

const pathPrefixer = Symbol('pathPrefixer')

const routerMap = new Map()

const prefix = path => target => target.prototype[pathPrefixer] = path

const change2Arr = target => Array.isArray(target) ? target : [target]

const _setRouter = method => subPath => (target, key, descriptor) => {
  const configs = { method, subPath, target }
  const controllers = target[key]
  routerMap.set(configs, controllers)
  return descriptor
}

const methodsList = methods.reduce((ctx, key) => {
  ctx[key] = _setRouter(key)
  return ctx
}, {})

const _covert = middleware => (target, key, descriptor) => {
  target[key] = change2Arr(middleware).concat(change2Arr(target[key]))
  return descriptor
}

const required = (params) => _covert(async (ctx, next) => {
  let errs = []

  for (let key in params) {
    errs = errs.concat(params[key].filter(_ => !ctx.request[key][_]))
  }

  if (errs.length) {
    ctx.body = { success: false, code: 403, msg: '请求数据被拒绝!' }
  } else {
    await next()
  }
})

const createRouter = (app, routesPath, routes) => {
  const path = require('path')
  const KoaRouter = require('koa-router')

  const router = new KoaRouter()

  routes.map(route => path.join(routesPath, route)).forEach(require)

  for (let [configs, controllers] of routerMap) {
    const { method, subPath, target } = configs

    router[method](path.posix.join(target[pathPrefixer] + subPath), ...change2Arr(controllers))
  }

  app.use(router.routes()).use(router.allowedMethods())

  return router
}

module.exports = { ...methodsList, createRouter, prefix, required }
