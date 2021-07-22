require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./database');

//MIDDLEWARES
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//cada vez que se pida una ruta usa el router propio exportado desde routes.js
app.use('/', require('./routes'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
