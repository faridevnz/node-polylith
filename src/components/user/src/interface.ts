import * as Core from './core';
import { User } from '../resources/user.interface';


const findUsers = (): Promise<User[]> => Core.findAllUsers();
const findUser = (id: number): Promise<User|null> => Core.findUserById(id);
const findUserByEmail = (email: string): Promise<User|null> =>  Core.findUserByEmail(email);
const createUser = (user: any): Promise<User>|null => Core.createOneUser(user);
const deleteUser = (id: number): Promise<User> => Core.deleteUserById(id);


export { 
    // types
    User,
    // functions
    findUsers, 
    findUser, 
    findUserByEmail, 
    createUser, 
    deleteUser 
}