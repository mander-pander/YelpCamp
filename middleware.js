module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be signed in for that.');
        res.redirect('/login');
    }
    next();
}