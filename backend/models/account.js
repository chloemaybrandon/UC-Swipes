const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: null,
    },
    joindate: {
        type: Date,
    },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
