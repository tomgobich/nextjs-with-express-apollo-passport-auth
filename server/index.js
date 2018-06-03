const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressValidator = require('express-validator')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const next = require('next')

const schema = require('./data/schema')

require('dotenv').config()
require('./services/passport')

mongoose.connect(process.env.MONGO_URL)

const port = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mongoStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

const sessionConfig = {
  secret: process.env.APP_SECRET,
  key: 'token',
  resave: false,
  saveUninitialized: false,
  store: mongoStore
}

// bind nessessary context and schemas
function bindGraphqlExpress(req, res) {
  let context = {
    login: req.login.bind(req),
    user: req.user
  }

  return { schema, context }
}

app.prepare().then(() => {
  const server = express()

  // express addons
  server.use(expressValidator())
  server.use(cookieParser())
  server.use(session(sessionConfig))

  // passport initialization
  server.use(passport.initialize())
  server.use(passport.session())

  // graphql initialization
  server.use('/graphql', bodyParser.json())
  server.use('/graphql', graphqlExpress(bindGraphqlExpress))
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  // register non-nextjs routes
  require('./routes')(server, passport)

  // allow nextjs to handle rest
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // start express server
  server.listen(port, () => console.log(`> Ready at ${process.env.SERVER_URL}`))
})
