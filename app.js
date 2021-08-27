global.express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
global.session = require('express-session')
global.bcryt = require('bcryptjs')
global.authentication = require('./authentication/auth')
const indexRouter = require('./routers/index')
const blogRouter = require('./routers/blog')

const PORT = process.env.PORT || 8080

// Set up Mustache
app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

// Set up Dotenv
require('dotenv').config()

// Set up Session
app.use(session({
    secret: "secretkey",
    saveUninitialized: true,
    resave: false
}))

// Set up routers
app.use('/index', indexRouter)
app.use('/blog', blogRouter)

app.use(express.static('public'))

app.use(express.urlencoded())
app.use(express.json())


app.listen(PORT, () => console.log('Server is running...'))