var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var Currency    = require('mongoose-currency');

var trouserSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    class : {
        type : String,
        default : 'Quần'
    },
    price: {
        type: Currency
    },
    price_sale: {
        type: Currency
    },
    tittle: {
        type: String
    },
    material: {
        type: String
    },
    color: {
        type: String
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default : 4
    },
    size: {
        type: String
    },
    image: {
        type: Array
    },
    description: {
        type: String
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
    },
    onSale: {
        type : Boolean,
        default : false
    },
    abs : {
        type : Boolean,
        default : false
    }
});

var trousers = mongoose.model('trouser', trouserSchema);

module.exports = trousers;