import { pipe } from 'fp-ts/lib/function';
import { User } from './interface';
import * as Changeset from '../../changeset/src/interface';


/**
 * User scheme
 */
const scheme: string[] = [
    'name',
    'email'
];

/**
 * Generate User Changeset from data
 * @param data 
 * @returns 
 */
const user_changeset = (data: { [key: string]: unknown }): Changeset.Changeset<User> => {
    const changeset = Changeset.changeset<User>(data, scheme);
    return pipe(
        changeset,
        Changeset.validate_required<User>(['email']),
        Changeset.validate_format<User>([
            { key: 'email', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }, 
            { key: 'name', pattern: /^[A-Z]/ }
        ]),
        Changeset.validate_exclusion<User>(['id'])
    );
}


export { 
    // functions
    user_changeset
}