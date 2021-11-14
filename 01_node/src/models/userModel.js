const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
        uppercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        validate: {
            validator (value) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 70
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    }
}, {minimize:false, timestamps:true, collection: "users"});

module.exports = mongoose.model("user", schema);