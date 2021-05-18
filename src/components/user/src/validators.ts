import { User } from '../resources/user.interface';

/**
 * Validator function
 * @param user 
 * @return boolean
 */
const validate = (user: User|null): boolean => {
    const validated_user = hasEmail(user);
    return validated_user !== null;
}

/**
 * Verify if email isset in User
 * @param user to validate
 * @return null if not valid
 * @return user if valid
 */
const hasEmail = (user: User|null): User|null => {
    return user?.email ? user : null;
}

export { validate }