const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    },
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function (password) {
    this.salt =  bcrypt.genSaltSync(saltRounds);
    this.hash = bcrypt.hashSync(password, this.salt);
};
userSchema.methods.validPassword = function (password) {
    const hash = bcrypt.hashSync(password, this.salt);
    return this.hash === hash;
};

mongoose.model('User', userSchema);