const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// router
const categorisRouter = require('./app/api/v1/categories/router');
const v1 = '/api/v1/cms';

// Inisiasi router middleware
const notFoundMiddleware = require('./app/middlewares/not-found');
const handlerErrorMiddleware = require('./app/middlewares/handler-error');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to API MERN BWA',
    });
});

app.use(v1, categorisRouter);
// Pakai middlewarenya diatas
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
