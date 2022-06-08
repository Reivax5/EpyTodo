const connection = require('../../config/db').connection;

function createTodo(res, todo) {
    console.log("Creating todo")
    try {
        connection.query(
            "INSERT INTO `todo` ( `title`, `description`, `due_time`, `user_id`, `status`) VALUES \
            (?, ?, ?, ?, ?)", [ todo.title, todo.description, todo.due_time, todo.user_id, todo.status ],
            (err, createdTodo) => {
                if (err) {
                    res
                    .status(400)
                    .json({ msg: "Internal server error"});
                    return;
                }
                getTodoById(res, createdTodo.insertId);
            }
        )
    } catch {
        res
        .status(400)
        .json({ msg: "Bad parameter"} )
    }
}

function deleteTodo(res, id) {
    console.log("Deleting todi")
    connection.query(
        'DELETE FROM `todo` WHERE `id` = ?', [ id ],
        function(err) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Not  Found" });
                return;
            }
            res
            .status(200)
            .json({ msg : "Successfully deleted record number: " + id})
        }
    )
}

function getTodoById(res, id) {
    console.log("Getting todo by id")
    connection.query(
        'SELECT * FROM `todo` WHERE `id` = ?', [ id ],
        function(err, todo) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            if (todo.length == 0) {
                res
                .status(400)
                .json({ msg: "Not Found" });
                return;
            }
            todo[0].created_at = todo[0].created_at.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            todo[0].due_time = todo[0].due_time.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            res
            .status(200)
            .json(todo[0])
        }
    )
};

function getTodoByUserId(res, email) {
    console.log("Getting todo by user id")
    connection.query(
        'SELECT * FROM `user` WHERE `email` = ?', [ email ],
        function(err, user) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            if (user.length == 0) {
                res
                .status(400)
                .json({ msg: "Not Found" });
                return;
            }
            connection.query(
                'SELECT * FROM `todo` WHERE `user_id` = ?', [ user[0].id ],
                function(err, todo) {
                    if (err) {
                        res
                        .status(400)
                        .json({ msg: "Internal server error" })
                        return;
                    }
                    if (todo.length == 0) {
                        res
                        .status(400)
                        .json({ msg: "Not Found" });
                        return;
                    }
                    for (let i = 0; i < todo.length; i++) {
                        todo[i].due_time = todo[i].due_time.toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        todo[i].created_at = todo[i].created_at.toISOString().replace(/T/, ' ').replace(/\..+/, '')
                    }
                    console.log(todo)
                    res
                    .status(200)
                    .json(todo)
                }
            )
        }
    )
};

function updateTodo(res, id, body) {
    console.log("Updating todo by id")
    connection.query(
        'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
        [ body.title,  body.description, body.due_time, body.user_id, body.status, id ],
        function(err, todo) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            if (todo.affectedRows == 0) {
                res
                .status(400)
                .json({ msg: "Not found" })
                return;
            }
            console.log(todo)
            res
            .status(200)
            .json(body)
        }
    )
}

module.exports = {
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    getTodoById: getTodoById,
    getTodoByUserId: getTodoByUserId,
    updateTodo: updateTodo
}