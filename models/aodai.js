var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Currency = require('mongoose-currency');

var aodaiSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true
    },
    price_fake: {
        type: Currency
    },
    tittle: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    image: {
        type: Array
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    label: {
        type: String,
        default: 'New'
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    featured: {
        type: Boolean,
        default: false
    }
});

var aodai = mongoose.model('aodai', aodaiSchema);

module.exports = aodai;