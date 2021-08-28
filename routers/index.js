router = express.Router()

router.get('/', async(req, res) => {
    const blogs = await models.Blog.findAll({})

    res.render('index', { allBlogs: blogs })
})

router.get('/details/:id', async(req, res) => {
    const blog_id = req.params.id

    const blog = await models.Blog.findByPk(blog_id)
    console.log(blog)
    res.render('blogDetails', blog)
})

// LEFT FROM HERE
router.post('/leave-comment', (req, res) => {
    const { bodyText } = req.body
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/register', (req, res) => {
    const { firstName, lastName, username, password, email } = req.body

    bcrypt.hash(password, 10, (error, hash) => {
        if (!error) {
            models.User.create({
                first_name: firstName,
                lastname: lastName,
                email: email,
                username: username,
                password: hash
            }).then(() => {
                res.render('login', { message: 'Register Successful! Please log in.' })
            })
        } else {
            res.render('register', { errorMsg: 'Please try to register again.' })
        }
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    models.User.findOne({
        where: {
            username: username
        }
    }).then((registerdUser) => {
        bcrypt.compare(password, registerdUser.password, (error, result) => {
            if (result) {
                if (req.session) {
                    req.session.user_id = parseInt(registerdUser.id)
                    req.session.username = username
                    req.session.firstName = registerdUser.first_name
                    req.session.lastName = registerdUser.lastname

                    res.redirect('/blog')
                }
            } else {
                res.render('login', { errorMsg: 'Username or password is incorrect.' })
            }
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        req.clearCookie('connect.sid')
    })
})

router.post('/logout', (req, res) => {
    res.redirect('/index')
})

module.exports = router