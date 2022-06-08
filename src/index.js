const express = require('express');
require('express-async-errors');

const port = process.env.PORT || '3001';
const routes = require('./Routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`API running on localhost: ${port}`));