const express = require('express');
const cors = require ('cors')
const app = express();
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8000;
require('./routes/item.routes')(app);
require('./routes/money.routes')(app);

app.listen(port, ()=> console.log(`Listening on port : ${port}`));