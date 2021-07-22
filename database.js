require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Conectado a la base de datos 👾"))
    .catch(err => console.error(error))