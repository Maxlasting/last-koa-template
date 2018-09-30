const { createRouter } = require('../decorators')
const { join } = require('path')
const config = require('../config.js')

const routesPath = join(__dirname, '../routes/')

const routes = config.routes

module.exports = app => createRouter(
  app,
  routesPath,
  routes
)
