class Constants {
    static readonly REGISTER = {
        USER_ALREADY_EXISTS: 'User already exists',
        INVALID_EMAIL: 'Invalid email',
        INVALID_PASSWORD: 'Invalid password',
        INVALID_FIRST_NAME: 'Invalid first name',
        INVALID_LAST_NAME: 'Invalid last name',
        INVALID_ROLES: 'Invalid roles',
    };

    static readonly RESET_PASSWORD = {
        USER_NOT_FOUND: 'User not found',
        INVALID_EMAIL: 'Invalid email',
        INVALID_PASSWORD: 'Invalid password',
        ERROR_UPDATING_PASSWORD: 'Error updating password',
    };

    static readonly LOGIN = {
        INVALID_CREDENTIALS: 'Invalid credentials',
    };
}

export default Constants;

