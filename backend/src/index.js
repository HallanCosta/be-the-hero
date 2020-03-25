const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
 
app.use(cors());
app.use(express.json()); //Converte o json que você manda ou recebe em objeto do javascript
app.use(routes);

app.listen(3333);