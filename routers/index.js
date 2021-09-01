const { sequelize } = require("../models")

router = express.Router()

router.get('/', async(req, res) => {
    const blogs = await models.Blog.findAll({})

    res.render('index', { allBlogs: blogs })
})

// Display the blog details page
router.get('/details/:id', async(req, res) => {
    if (req.session) {
        if (req.session.username) {
            res.locals.isAuthenticated = true
        }
    }
    const blog_id = parseInt(req.params.id)

    const blog = await models.Blog.findByPk(blog_id, {
        include: [{
            model: models.Comment,
            as: 'comments'
        }]
    })
    res.render('blogDetails', blog.dataValues)
})

// Leave and Post a comment
router.get('/:id/leave-comment', async(req, res) => {
    const blogs_by_id = await models.Comment.findAll({
        where: {
            blog_id: req.params.id
        }
    })

    res.json(blogs_by_id)
})

router.post('/leave-comment', async(req, res) => {
    const { bodyText, blogId } = req.body

    const comment = await models.Comment.create({
        body_text: bodyText,
        blog_id: blogId
    })

    res.json({ success: true, oneComment: comment.dataValues })
})

// Sort blogs by Newest and Oldest
router.get('/sort-by-newest', async(req, res) => {
    const newestSort = await models.Blog.findAll({
        order: [
            ['id', 'DESC']
        ]
    })

    res.json(newestSort)
})

router.get('/sort-by-oldest', async(req, res) => {
    const oldestSort = await models.Blog.findAll({
        order: [
            ['id', 'ASC']
        ]
    })

    res.json(oldestSort)
})

// Register a user
router.get('/register', (req, res) => {
    res.render('register')
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

// Login a user
router.get('/login', (req, res) => {
    res.render('login')
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

// Logout a user
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                next(error)
            } else {
                res.redirect('/')
            }
        })
    }
})

module.exports = router