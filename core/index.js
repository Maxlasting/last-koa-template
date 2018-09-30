const { app, appLoader } = require('./create-app.js')
const port = process.env.PORT || 8080

appLoader.add(['catcher', 'body', 'favicon', 'render', 'router']).init(app)

app.listen(port, () => {
  console.log(`Server is running at %d`, port)
})

