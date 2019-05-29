const session = require('koa-session')
// const nanoid = require('nanoid')
const redis = require('redis')
const redisConfig = require('../config.js').redis

const redisClient = redis.createClient(redisConfig)

redisClient.on('connect', () => console.log('Successfull connected to redis!'))

const getValue = key => new Promise((resolve, reject) => {
  redisClient.get(key, (err, data) => {
    if (err) return reject(err)
    resolve(data)
  })
})

const sessionConfig = {
  key: 'FQ:BLOG', maxAge: 1000 * 10 * 60 * 60 * 60, overwrite: true, httpOnly: true, signed: true, rolling: false,
  store: {
    async get (key, maxAge) {
      const ret = await getValue(key)
      return JSON.parse(ret)
    },
    set (key, value, maxAge) {
      redisClient.set(key, JSON.stringify(value))
      if (maxAge) {
        redisClient.pexpire(key, maxAge)
      }
    },
    destroy (key) {
      redisClient.del(key)
    },
  }
}

module.exports = app => {
  app.keys = ['FQ', 'MAXLASTING']
  app.use(session(sessionConfig, app))
}
