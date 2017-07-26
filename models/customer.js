var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Currency = require('mongoose-currency');

var customerSchema = new Schema({
    name : {
        type : String
    },
    phone : {
        type : String
    },
    address : {
        type : String
    },
    city : {
        type : String
    },
    bill : {
        type : Array
    },
    total : {
        type : Number,
        required : true
    },
    done : {
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

var customer = mongoose.model('customer', customerSchema);
module.exports = customer;