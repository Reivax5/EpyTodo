module.exports = (app, jwt, secret) => {
    app.use('/user', (req, res, next) => {
        if (!req.headers.token) {
            res
            .status(400)
            .json({ msg: "No token, authorization denied"});
            return;
        }
        try {
            jwt.verify(req.headers.token, secret);
        } catch {
            res
            .status(400)
            .json({ msg: "Token is not valid" });
            return;
        }
        next();
    })

    app.use('/todos', (req, res, next) => {
        if (!req.headers.token) {
            res
            .status(400)
            .json({ msg: "No token, authorization denied"});
            return;
        }
        try {
            jwt.verify(req.headers.token, secret);
        } catch {
            res
            .status(400)
            .json({ msg: "Token is not valid" });
            return;
        }
        next();
    })
}