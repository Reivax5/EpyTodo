const connection = require('../../config/db').connection;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function addUser(res, user) {
    console.log("Adding user")
    connection.query(
        'SELECT * FROM `user` WHERE `email` = ?', [ user.email ],
        function(err, rows) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            if (rows.length > 0) {
                res
                .status(400)
                .json({ msg: "Account already exists" });
                return;
            }
            bcrypt.genSalt(2, (err, salt) => {
                if (err) {
                    res
                    .status(400)
                    .json({ msg: "Internal server error" })
                    return;
                }
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        res
                        .status(400)
                        .json({ msg: "Internal server error" })
                        return;
                    }
                    connection.query(
                        "INSERT INTO `user` ( `name`, `email`, `firstname`, `password`) VALUES \
                    (?, ?, ?, ?)", [ user.name, user.email, user.firstname, hash ],
                    function (err) {
                        if (err) {
                            res
                            .status(400)
                            .json({ msg: "Internal server error" })
                            return;
                        }
                        res
                        .status(200)
                        .json({ token: jwt.sign({ email: user.email, password: hash}, secret) });
                    })
                });
            });
        }
    )
}

function deleteUser(res, id) {
    console.log("Deleting user")
    connection.query(
        'DELETE FROM `user` WHERE `id` = ?', [ id ],
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

function getUser(res, param) {
    console.log("Getting user")
    connection.query(
        'SELECT * FROM `user` WHERE `email` = ? OR `id` = ?', [ param , param ],
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
            user[0].created_at = user[0].created_at.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            res
            .status(200)
            .json(user[0])
        }
    )
};

function loginUser(res, credentials) {
    console.log("Logging in user")
    connection.query(
        'SELECT * FROM `user` WHERE `email` = ?', [ credentials.email ],
        function(err, user) {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            if (user.length == 0 || !bcrypt.compareSync(credentials.password, user[0].password)) {
                res
                .status(400)
                .json({ msg: "Invalid Credentials" });
                return;
            }
            user = user[0];
            res
            .status(200)
            .json({ token: jwt.sign({ email: user.email, password: user.password }, secret)})
        }
    )
}

function updateUser(res, id, body) {
    console.log("Updating user by id")
    bcrypt.genSalt(2, (err, salt) => {
        if (err) {
            res
            .status(400)
            .json({ msg: "Internal server error" })
            return;
        }
        bcrypt.hash(body.password, salt, (err, hash) => {
            if (err) {
                res
                .status(400)
                .json({ msg: "Internal server error" })
                return;
            }
            connection.query(
                'UPDATE `user` SET `email` = ?, `password` = ?, `firstname` = ?, `name` = ? WHERE id = ?',
                [ body.email,  hash, body.firstname, body.name, id ],
                function(err, user) {
                    if (err) {
                        res
                        .status(400)
                        .json({ msg: "Internal server error" })
                        return;
                    }
                    if (user.affectedRows == 0) {
                        res
                        .status(400)
                        .json({ msg: "Not found" })
                        return;
                    }
                    getUser(res, id)
                }
            )
        });
    });
}

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    getUser: getUser,
    loginUser: loginUser,
    updateUser: updateUser
}