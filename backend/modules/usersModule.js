
var User = require('../models/users.model');

var usersModule = { 
    register: (objToSave) => {
        var newUser = new User(objToSave);
        return newUser.save();
    },

    login: (objToFind) => {
        return User.find(objToFind);
    },

    checkIfExists: (username) => {
        return User.findOne({ username: username })
    },

    getUsersList: () => {
        return User.find({})
    },

    findUser: (userId) => {
        return User.findById(userId)
    },

    addKeyword: (user) => {
        return User.findByIdAndUpdate(user._id, user, {useFindAndModify: false})
    },

    getKeywords: (userId) => {
        console.log("GET KEYWORDS OF ID =>" + userId)
        return User.findById(userId).searchedKeywords
    },

    addWatchedVideo: (user) => {
        return User.findByIdAndUpdate(user._id, user, {useFindAndModify: false})
    }

}

module.exports = usersModule;