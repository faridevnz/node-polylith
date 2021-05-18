import { findAllUsers, createOneUser, findUserById, deleteUserById } from './core';
import { User } from '../resources/user.interface';


const findUsers = (): Promise<User[]> => findAllUsers();
const findUser = (id: number): Promise<User|null> => findUserById(id)
const createUser = (user: any): Promise<User>|null => createOneUser(user);
const deleteUser = (id: number): Promise<User> => deleteUserById(id);

export { findUsers, findUser, createUser, deleteUser }