require('dotenv').config();
const mongoose = require('mongoose');
const password = encodeURIComponent(process.env.mongo_password);
mongoose.connect('mongodb+srv://Admin:'+password+'@cluster0.4wi3q.mongodb.net/CurrencyDB?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
require('./user.model');