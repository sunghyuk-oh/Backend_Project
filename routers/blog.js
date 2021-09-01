router = express.Router()

router.get('/', async(req, res) => {
    const blogs = await models.Blog.findAll({})

    res.render('index', { allBlogs: blogs })
})

router.get('/display-profile', async(req, res) => {
    console.log(req.session.user_id)
    const profile = await models.User.findByPk(req.session.user_id, {
        include: [{
            model: models.Blog,
            as: 'blogs'
        }]
    })
    console.log(profile.dataValues)
    res.render('profile', profile.dataValues)
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

router.post('/delete-blog', async(req, res) => {
    const { deletedID } = req.body
    console.log(deletedID)

    const deletedBlog = await models.Blog.destroy({
        where: {
            id: parseInt(deletedID)
        }
    })
    console.log(deletedBlog)
    res.redirect('/blog/display-profile')
})

module.exports = router