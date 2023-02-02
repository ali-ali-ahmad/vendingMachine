const {Money} = require('../models/money.model');

module.exports.addMoney = (request, response) => {
    const {moneyType, amount, value, quantity} = request.body;
    Money.create({
        moneyType,
        amount,
        value,
        quantity
    })
    .then(money => response.json(money))
    .catch(err => response.json(err));
}

module.exports.getAllMoney = (request, response) => {
    Money.find({})
        .then(money => response.json(money))
        .catch(err => response.json(err))
}

module.exports.getMoney = (request, response) => {
    Money.findOne({_id: request.params.id})
        .then(money => response.json(money))
        .catch(err => response.json(err))
}

module.exports.updateMoney = (request, response) => {
    Money.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedMoney => response.json(updatedMoney))
        .catch(err => response.json(err))
}

module.exports.deleteMoney = (request, response) => {
    Money.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

