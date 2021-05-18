import { Request, Response } from 'express';
import { findUser, findUsers, createUser, deleteUser } from './../../../components/user/src/interface';

// USER HANDLERS

const findAllUsersHandler = async (req: Request, res: Response) => {
    // find
    const dbUsers = await findUsers();
    res.send({ users: dbUsers });
}

const findUserByIdHandler = async (req: Request, res: Response) => {
    const params: any = req.params;
    // find
    const user = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    res.send({ ...user });
}

const createUserHandler = async (req: Request, res: Response) => {
    const body: any = req.body;
    const user = { email: body.email, name: body.name }
    // create
    const created_user = await createUser(user);
    if ( created_user === null ) res.status(400).send({ message: 'Bad Request' });
    res.send({ users: created_user });
}

const deleteUserHandler = async (req: Request, res: Response) => {
    const params: any = req.params;
    // check if user already exists
    const user = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    // delete
    const deleted_user = await deleteUser( parseInt(params.id) );
    res.send({ ...deleted_user });
}

export { findUserByIdHandler, findAllUsersHandler, createUserHandler, deleteUserHandler }