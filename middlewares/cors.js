const cors = require('koa2-cors')

const allowMethods = ['get', 'post', 'delete', 'put']
const allowHeaders = ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Accept', 'X-Requested-With']

module.exports = app => app.use(cors({
  origin: '*', maxAge: 5, allowMethods, allowHeaders
}))
