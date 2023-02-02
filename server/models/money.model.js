const mongoose = require('mongoose');
const MoneySchema = new mongoose.Schema({
    moneyType: {
        type: String,
    },
    amount: {
        type: Number
    },
    value: {
        type: Number
    },
    quantity: {
        type: Number
    },
}, {timestamps: true});
module.exports.Money = mongoose.model('Money', MoneySchema)