const express = require('express');
const morgan = require('morgan');
const rootRouter = require('./routes/rootRouter.js');

const app = new express();

//! Define middlewares

app.use(morgan('dev'));
app.use(express.json())
//* <--- Configurar cors

//! Define routes
app.use(rootRouter);

module.exports = app;