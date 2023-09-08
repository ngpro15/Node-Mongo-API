const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Students')
.then(() => console.log("Connected to MongoDB"))
.catch(err=>console.error(`Error connecting to mongoDB ${err}`));