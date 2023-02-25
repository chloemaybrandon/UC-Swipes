const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenum: {
        type: Number,
        required: true
    },
    image: {},
    rating: {
        type: Number,
        default: 0
    },
    joindate: {
        type: String
    }
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;