const express = require('express');
const morgan = require('morgan');
const rootRouter = require('./routes/rootRouter.js');
const cors = require('cors');
const CustomErrors = require('./utils/errors/CustomErrors.js');

const app = new express();

//! Define middlewares

app.use(morgan('dev'));
app.use(express.json())

//* CORS configuration
const { CLIENT_URL_DEPLOY } = process.env;
const whiteList = [ CLIENT_URL_DEPLOY ];
const optionsCors = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true);
            return;
        }
        callback(CustomErrors.UnAuthorization('Not allowed by CORS'));
    }
};
//app.use(cors(optionsCors));

//* ######################

//! Define routes
app.use(rootRouter);

module.exports = app;