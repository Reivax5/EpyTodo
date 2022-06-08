const userQuery = require('./user.query');
const todosQuery = require('../todos/todos.query');

module.exports = (app, jwt, secret) => {
    app.get('/user/todos', (req, res) => {
        let decode = jwt.verify(req.headers.token, secret);
        todosQuery.getTodoByUserId(res, decode.email)
    });

    app.delete('/user/:id', (req, res) => {
        userQuery.deleteUser(res, req.params.id);
    });

    app.get('/user/:id', (req, res) => {
        console.log("Getting user by id")
        userQuery.getUser(res, req.params.id);
    });

    app.put('/user/:id', (req, res) => {
        if (!(req.body.email && req.body.password && req.body.firstname && req.body.name)) {
            res
            .status(400)
            .json({ msg: "Bad parameter" })
            return;
        }
        userQuery.updateUser(res, req.params.id, req.body);
    });

    app.get('/user', (req, res) => {
        let decoded = jwt.verify(req.headers.token, secret);
        userQuery.getUser(res, decoded.email);
    });
}