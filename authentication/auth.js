function authenticate(req, res, next) {
    if (req.session) {
        if (req.session.username) {
            res.locals.isAuthenticated = true
            next()
        } else {
            res.locals.loginErrorMsg = 'Please Log in First'
            res.redirect('/login')
        }
    } else {
        res.locals.loginErrorMsg = 'Please Log in First'
        res.redirect('/login')
    }
}

module.exports = authenticate