const mongoose = require('mongoose');
const MoneySchema = new mongoose.Schema({
    moneyType: {
        type: String,
    },
    amount: {
        type: Number
    },
}, {timestamps: true});
module.exports.Money = mongoose.model('Money', MoneySchema)