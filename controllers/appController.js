const home = (req, res, next) => {
    res.render('index');
}

const locals = (req, res, next) => {
    res.locals.user = req.user;
    next();
}

module.exports = {
    home,
    locals
}