var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    //facebook OAuth
    OauthId: String,
    OauthToken: String,
    admin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.method.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};

userSchema.plugin(passportLocalMongoose);

var users = mongoose.model('User', userSchema);
module.exports = users;