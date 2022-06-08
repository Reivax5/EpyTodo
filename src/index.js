const dotenv = require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

app.use(bodyParser.json());

require('./middleware/auth')(app, jwt, secret)
require('./routes/auth/auth')(app)
require('./routes/user/user')(app, jwt, secret)
require('./routes/todos/todos')(app, jwt, secret)

app.listen(port, () => {
    console.log("Listening on port %d", port);
});
