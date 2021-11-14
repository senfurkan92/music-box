const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    path: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    title: {
        type: String,
        maxlength: 100,
        trim: true
    },
    genre: {
        type: String,
        maxlength: 100,
        trim: true
    },
}, {
    timestamps: true,
    minimize: false,
});

const model = mongoose.model('songs', schema);

module.exports = model;
