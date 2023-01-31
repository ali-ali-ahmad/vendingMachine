const {Item} = require('../models/item.model');

module.exports.createItem = (request, response) => {
    const {itemName, quantity, price, code} = request.body;
    Item.create({
        itemName,
        quantity,
        price,
        code
    })
    .then(item => response.json(item))
    .catch(err => response.json(err));
}

module.exports.getAllItems = (request, response) => {
    Item.find({})
        .then(items => response.json(items))
        .catch(err => response.json(err))
}

module.exports.getItem = (request, response) => {
    Item.findOne({_id: request.params.id})
        .then(item => response.json(item))
        .catch(err => response.json(err))
}

module.exports.updateItem = (request, response) => {
    Item.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedItem => response.json(updatedItem))
        .catch(err => response.json(err))
}

// module.exports.setPlayerStatus = (request, response) => {
//     Player.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
//         .then(updatedPlayer => response.json(updatedPlayer))
//         .catch(err => response.json(err))
// }

module.exports.deleteItem = (request, response) => {
    Item.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

