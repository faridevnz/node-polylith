import express from 'express';
import { findAllUsersHandler, findUserByIdHandler, createUserHandler, deleteUserHandler } from './handlers';

// create application
const app = express();
// middlewares
app.use(express.json());

// ROUTES
// users
app.get('/users', findAllUsersHandler);
app.get('/users/:id', findUserByIdHandler);
app.post('/users', createUserHandler);
app.delete('/users/:id', deleteUserHandler);

// start server
app.listen(3000);