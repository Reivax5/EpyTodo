const userQuery = require('../user/user.query');

module.exports = (app) => {
    app.post('/register', (req, res) => {
        if (!(req.body.email && req.body.password && req.body.name && req.body.firstname)) {
            res
            .status(400)
            .json({ msg: "Bad paramater" });
            return;
        }
        userQuery.addUser(res, req.body);
    });

    app.post('/login', (req, res) => {
        if (!(req.body.email && req.body.password)) {
            res
            .status(400)
            .json({ msg: "Bad paramater" });
            return;
        }
        userQuery.loginUser(res, req.body);
    })
}
