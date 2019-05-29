const { createRouter } = require('../core/index.js')
const { join } = require('path')
const { routes } = require('../config.js')
const routesPath = join(__dirname, '../routes')

module.exports = app => createRouter(app, routesPath, routes)
