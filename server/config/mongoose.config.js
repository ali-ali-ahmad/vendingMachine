const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/vending_machine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Established a connection to Datebase'))
.catch(err => console.log('something went wrong when connecting to Datebase', err));

