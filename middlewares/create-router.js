const createRouter = require('../core/create-router.js')
const path = require('path')
const { routes } = require('../config')
const routesPath = path.join(__dirname, '..', 'routes')

module.exports = app => createRouter(app, routesPath, routes)
