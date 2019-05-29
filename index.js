require('@babel/register')

require("@babel/polyfill")

// require('./database')

const path = require('path')

const app = require('./app.js')

const { middlewares } = require('./config.js')

middlewares.map(
  m => path.join(__dirname, 'middlewares', m)
).forEach(
  _ => require(_)(app)
)

const port = process.env.PORT || 3333

app.listen(
  port,
  () => console.log(`Server is successfully running at port: ${port}!`)
)
