router = express.Router()

router.get('/', async(req, res) => {
    const blogs = await models.Blog.findAll({})

    res.render('loggedIndex', { allBlogs: blogs })
})

router.get('/post-blog', (req, res) => {
    res.render('blogPost')
})

router.post('/post-blog', async(req, res) => {
    const { title, bodyText, region, keyword, image } = req.body

    const blog = await models.Blog.create({
        title: title,
        body_text: bodyText,
        region: region,
        keyword: keyword,
        image: image,
        user_id: req.session.user_id
    })

    res.redirect('/blog')
})

// LEFT FROM HERE
router.post('/leave-comment', (req, res) => {
    const { bodyText } = req.body
})

module.exports = router