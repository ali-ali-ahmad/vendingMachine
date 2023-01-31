const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    code: {
        type: String
    },
}, {timestamps: true});
module.exports.Item = mongoose.model('Item', ItemSchema)