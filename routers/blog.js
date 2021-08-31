router = express.Router()

router.get('/', async(req, res) => {
    const blogs = await models.Blog.findAll({})

    res.render('index', { allBlogs: blogs })
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

// Leave a comment
router.get('/leave-comment', async(req, res) => {
    const blogs_by_id = await models.Comment.findAll({})

    res.json(blogs_by_id)
})

router.post('/leave-comment', async(req, res) => {
    const { bodyText, blogId } = req.body

    const comment = await models.Comment.create({
        body_text: bodyText,
        blog_id: blogId
    })

    res.json({ success: true })
})

module.exports = router