const ItemController = require ('../controllers/item.controller');
module.exports = function(app){
    app.post('/api/items', ItemController.createItem);
    app.get('/api/items', ItemController.getAllItems);
    app.get('/api/items/:id', ItemController.getItem);
    app.put('/api/items/:id', ItemController.updateItem);
    app.delete('/api/items/:id', ItemController.deleteItem);
}



