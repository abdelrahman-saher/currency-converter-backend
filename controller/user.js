require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require("jsonwebtoken");
exports.signUpWithEmailAndPassword = async (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user != null) {
            return res.status(400).json({ message: "user already exists" });
        } else {
            let newUser = new User();
            newUser.userName = req.body.username;
            newUser.email = req.body.email;
            newUser.setPassword(req.body.password);
            newUser.save((err, u) => {
                if (err) {
                    return res.status(400).json({
                        message: "Failed to add user."
                    });
                }
                else {
                    const token = jwt.sign({
                        id: u._id.toString(),
                    }, process.env.JWT_SECRET);
                    return res.status(200).json({
                        message: "User added successfully.",
                        token: token,
                        username: u.userName,
                    });
                }
            });
        }
    });
};
exports.logInWithEmailAndPassword = async (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                const token = jwt.sign({
                    id: user._id.toString(),
                }, process.env.JWT_SECRET);
                return res.status(200).send({
                    message: "User Logged In",
                    token: token,
                    username: user.userName,
                });
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
};
exports.signUpWithFacebook = async (req, res, next) => {
    User.findOne({ facebookId: req.body.facebookId }, function (err, user) {
        if (user != null) {
            return res.status(400).json({ message: "user already exists" });
        } else {
            User.findOneAndUpdate({ email: req.body.email }, { $set: { "facebookId": req.body.facebookId }, },
                function (err, doc) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        if (doc == null) {
                            let newUser = new User();
                            newUser.userName = req.body.username;
                            newUser.email = req.body.email;
                            newUser.facebookId = req.body.facebookId;
                            return newUser.save((err, u) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: "Failed to add user."
                                    });
                                }
                                else {
                                    const token = jwt.sign({
                                        id: u._id.toString(),
                                    }, process.env.JWT_SECRET);
                                    return res.status(200).json({
                                        message: "User added successfully.",
                                        token: token,
                                        username: u.userName,
                                    });
                                }
                            });
                        } else {
                            const token = jwt.sign({
                                id: doc._id.toString(),
                            }, process.env.JWT_SECRET);
                            return res.status(200).json({
                                message: "User added successfully.",
                                token: token,
                                username: doc.userName,
                            });
                        }

                    }
                });
        }
    });
};
exports.logInWithFacebook = async (req, res, next) => {
    User.findOne({ facebookId: req.body.facebookId }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            const token = jwt.sign({
                id: user._id.toString(),
            }, process.env.JWT_SECRET);
            return res.status(200).send({
                message: "User Logged In",
                token: token,
                username: user.userName,
            });
        }
    });
};
exports.signUpWithGoogle = async (req, res, next) => {
    User.findOne({ googleId: req.body.googleId }, function (err, user) {
        if (user != null) {
            return res.status(400).json({ message: "user already exists" });
        } else {
            User.findOneAndUpdate({ email: req.body.email }, { $set: { "googleId": req.body.googleId }, },
                function (err, doc) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        if (doc == null) {
                            let newUser = new User();
                            newUser.userName = req.body.username;
                            newUser.email = req.body.email;
                            newUser.googleId = req.body.googleId;
                            return newUser.save((err, u) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: "Failed to add user."
                                    });
                                }
                                else {
                                    const token = jwt.sign({
                                        id: u._id.toString(),
                                    }, process.env.JWT_SECRET);
                                    return res.status(200).json({
                                        message: "User added successfully.",
                                        token: token,
                                        username: u.userName,
                                    });
                                }
                            });
                        } else {
                            const token = jwt.sign({
                                id: doc._id.toString(),
                            }, process.env.JWT_SECRET);
                            return res.status(200).json({
                                message: "User added successfully.",
                                token: token,
                                username: doc.userName,
                            });
                        }

                    }
                });
        }
    });
};
exports.logInWithGoogle = async (req, res, next) => {
    User.findOne({ googleId: req.body.googleId }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            const token = jwt.sign({
                id: user._id.toString(),
            }, process.env.JWT_SECRET);
            return res.status(200).send({
                message: "User Logged In",
                token: token,
                username: user.userName,
            });
        }
    });
};