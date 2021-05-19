import { Request, Response } from 'express';
import { findUser, findUsers, findUserByEmail, createUser, deleteUser, User } from './../../../components/user/src/interface';
import * as Changeset from './../../../components/changeset/src/interface';
import { validate_exclusion, validate_format, validate_required } from '../../../components/changeset/src/interface';
import { pipe } from 'fp-ts/lib/function';

// USER HANDLERS

const findAllUsersHandler = async (req: Request, res: Response) => {
    // find
    const users: User[] = await findUsers();
    res.send({ users: users });
}

const findUserByIdHandler = async (req: Request, res: Response) => {
    const params: any = req.params;
    // find
    const user: User|null = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    res.send({ ...user });
}

const createUserHandler = async (req: Request, res: Response) => {
    const body: {[key: string]: unknown} = req.body;
    // create and validate the changeset
    const userChangeset = Changeset.changeset<User>(body, ['email', 'name']); 
    let chs: Changeset.Changeset<User> = pipe(
        userChangeset,
        validate_required<User>(['email']),
        validate_format<User>([{ key: 'email', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }]),
        validate_format<User>([{ key: 'name', pattern: /^[A-Z]/ }]),
        validate_exclusion<User>(['id'])
    );
    // check if user is valid
    if ( !chs.valid ) return res.status(404).send({ message: 'Bad Request' });
    // check if email altready exists
    const dbUser: User|null = await findUserByEmail( String(userChangeset.data.email) );
    if ( !!dbUser ) return res.status(409).send({ message: 'Conflict' });
    // create
    const created_user: User|null = await createUser(userChangeset.data);
    if ( !created_user ) res.status(400).send({ message: 'Bad Request' });
    res.send({ users: created_user });
}

const deleteUserHandler = async (req: Request, res: Response) => {
    const params: any = req.params;
    // check if user already exists
    const user: User|null = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    // delete
    const deleted_user: User = await deleteUser( parseInt(params.id) );
    res.send({ ...deleted_user });
}

export { findUserByIdHandler, findAllUsersHandler, createUserHandler, deleteUserHandler }