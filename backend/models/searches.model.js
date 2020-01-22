const Mongoose = require('mongoose')

const Schema = Mongoose.Schema;

const searchSchema = new Schema({
    term: {type: String, required: true},
    username: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true}
}, {
    timestamps: true
});

const Search = Mongoose.model('Search', searchSchema);
module.exports = Search;