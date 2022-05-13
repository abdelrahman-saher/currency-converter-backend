require('./model/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require("./router/user");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use((error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    res.status(error.statusCode).json({ "message": error.message, });
});
app.listen(3000);