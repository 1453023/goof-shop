exports.index = function(req, res) {
    if (req.body.username) {
        res.render("pages/index", { username: req.body.username, title: 'G-O-O-F' });
    } else {
        res.render("pages/index", { username: "", title: 'G-O-O-F' });
    }
}