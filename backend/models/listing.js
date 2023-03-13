const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    poster_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    meet_time: {
        type: String,
        required: true
    },

    meet_date: {
        type: Date,
        required: true
    },

    post_date: {
        type: Date,
        required: true
    },

    purchased_bool: {
        type: Boolean,
        required: true
    }
});

/*
_id
63f94921f9ab2eb4c60c2bae
username
"test1"
password
"12345678"
name
"TEST1"
email
"TEST1@gmail.com"
phonenum
1234567891
rating
0
joindate
"Fri Feb 24 2023 15:32:49 GMT-0800 (Pacific Standard Time)"
__v
0*/

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;