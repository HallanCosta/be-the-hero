const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();
 
app.use(cors());
app.use(express.json()); //Converte o json que você manda ou recebe em objeto do javascript
app.use(routes);
app.use(errors());

module.exports = app;