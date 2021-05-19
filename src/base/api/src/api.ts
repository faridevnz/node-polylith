import express, { Request, Response } from 'express';
import * as Log from '../../../components/logger/src/core';
import * as Handlers from './handlers';
const pino = require('pino-http')();

// create application
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(pino);

app.use((req, res, next) => {
    Log.log('LOG test');
    next();
});

// ROUTES
// users
app.get('/users', Handlers.findAllUsersHandler);
app.get('/users/:id', Handlers.findUserByIdHandler);
app.post('/users', Handlers.createUserHandler);
app.delete('/users/:id', Handlers.deleteUserHandler);
// articles
app.get('/articles', Handlers.findAllArticlesHandler);
app.get('/articles/:id', Handlers.findArticleByIdHandler);
app.post('/articles', Handlers.createArticleHandler);
app.delete('/articles/:id', Handlers.deleteArticleHandler);

// default error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    res.status(err.status || 500);
    res.send({ message: err.message });
});

// start server
app.listen(3000);