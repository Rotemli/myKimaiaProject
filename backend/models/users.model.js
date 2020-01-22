
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: String,
    isAdmin: String,
    searchedKeywords:[{
        keyword: String
    }],
    watchedVideos: [{
        videoName: String,
        duration: String
    }]
});

module.exports = Mongoose.model('User', userSchema);
