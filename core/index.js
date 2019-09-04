const { prefixer, routerMap } = require('./varable.js')

const methods = ['get', 'post', 'del', 'put']

const prefix = path => target => target.prototype[prefixer] = path

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

module.exports = { ...methodsList, prefix }
