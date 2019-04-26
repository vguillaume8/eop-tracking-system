const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    n_id: {
        type: String,
        unique: false,
        required: false,
        sparse: true
    },

    advisor_name: {
        type: String,
        unique: false,
        required: true
    },

    date: {
        type: String,
        unique: false,
        require: true
    },

    comment: {
        type: String,
        required: true
    },

    selfact: Boolean,
    emotional: Boolean,
    community: Boolean,
    intellectual: Boolean,
    health: Boolean,
    prof: Boolean


});


module.exports = mongoose.model('Comment', CommentSchema);
