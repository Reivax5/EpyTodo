const todosQuery = require('./todos.query');

module.exports = (app, jwt, secret) => {
    app.post('/todos', (req, res) => {
        if (!(req.body.title && req.body.description && req.body.due_time && req.body.user_id && req.body.status)) {
            res
            .status(400)
            .json({ msg: "Bad parameter" })
            return;
        }
        todosQuery.createTodo(res, req.body)
    });

    app.get('/todos', (req, res) => {
        let decode = jwt.verify(req.headers.token, secret);
        todosQuery.getTodoByUserId(res, decode.email)
    });

    app.delete('/todos/:id', (req, res) => {
        jwt.verify(req.headers.token, secret);
        todosQuery.deleteTodo(res, req.params.id)
    });

    app.get('/todos/:id', (req, res) => {
        jwt.verify(req.headers.token, secret);
        todosQuery.getTodoById(res, req.params.id)
    });

    app.put('/todos/:id', (req, res) => {
        jwt.verify(req.headers.token, secret);
        if (!(req.body.title && req.body.description && req.body.user_id && req.body.status)) {
            res
            .status(400)
            .json({ msg: "Bad parameter" })
            return;
        }
        todosQuery.updateTodo(res, req.params.id, req.body);
    });
}