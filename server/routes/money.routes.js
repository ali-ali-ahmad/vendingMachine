const MoneyController = require ('../controllers/money.controller');
module.exports = function(app){
    app.post('/api/money', MoneyController.addMoney);
    app.get('/api/money', MoneyController.getAllMoney);
    app.get('/api/money/:id', MoneyController.getMoney);
    app.put('/api/money/:id', MoneyController.updateMoney);
    app.delete('/api/money/:id', MoneyController.deleteMoney);
}