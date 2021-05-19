import { changeset } from '../../changeset/src/interface';
import { User } from '../resources/user.interface';
import { client } from './../../database/src/interface';

/**
 * Find all users
 * @returns array of users
 */
const findAllUsers = (): Promise<User[]> => {
    return client().user.findMany();
}

/**
 * Find one user by id
 * @param id of user to find
 * @returns user or null
 */
const findUserById = ( id: number ): Promise<User|null> => {
    return client().user.findUnique({
        where: { id: id }
    });
}

/**
 * Find one user by email
 * @param email of user to find
 * @returns user or null
 */
const findUserByEmail = ( email: string ): Promise<User|null> => {
    return client().user.findUnique({
        where: { email: email }
    });
}

/**
 * Create a user
 * @param user to store
 * @returns the stored user
 */
const createOneUser = ( user: User ): Promise<User>|null => {
    // create
    return client().user.create({ 
        'data': {
            'name': user.name,
            'email': user.email
        } 
    });
}

/**
 * Delete a user
 * @param id of user to delete
 * @returns the deleted user
 */
const deleteUserById = ( id: number ): Promise<User> => {
    return client().user.delete({
        where: { id: id }
    });
}

export { findAllUsers, findUserById, findUserByEmail, createOneUser, deleteUserById }