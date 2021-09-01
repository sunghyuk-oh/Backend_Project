global.express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
global.session = require('express-session')
global.bcrypt = require('bcryptjs')
global.authentication = require('./authentication/auth')
global.models = require('./models')
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

// Set up Middlewares
app.use(express.urlencoded())
app.use(express.json())

app.use((req, res, next) => {
    res.locals.isAuthenticated = false
    next()
})

// Set up Static Resources
app.use(express.static('public'))

// Set up routers
app.use('/blog', authentication, blogRouter)
app.use('/', indexRouter)


app.listen(PORT, () => console.log('Server is running...'))