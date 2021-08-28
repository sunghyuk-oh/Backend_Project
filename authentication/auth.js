function authenticate(req, res, next) {
    if (req.session) {
        if (req.session.username) {
            next()
        } else {
            res.render('index', { loginErrorMsg: 'Please Log In First' })
        }
    } else {
        res.render('login', { loginErrorMsg: 'Please Log In First' })
    }
}

module.exports = authenticate