const mongoose = require('mongoose')
const glob = require('glob')
const { join } = require('path')
const { database } = require('../config.js')

glob.sync(join(__dirname, '*[.]*.js')).forEach(require)

mongoose.Promise = global.Promise

mongoose.set('debug', process.env.NODE_ENV === 'development')

mongoose.set('useCreateIndex', true)

mongoose.connect(database, { useNewUrlParser: true })

mongoose.connection.once('open', async () => {
  console.log(`Successfull connected to mongodb -> ${ database }`)
  await init()
})

mongoose.connection.on('err', err => console.error(err))

let tryTimes = 0

mongoose.connection.on('disconnected', () => {
  if (++tryTimes < 5) {
    mongoose.connect(database, { useNewUrlParser: true })
  } else {
    reject(new Error('数据库错误'))
  }
})

