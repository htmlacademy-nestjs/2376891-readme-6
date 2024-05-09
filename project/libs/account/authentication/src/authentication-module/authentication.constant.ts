export const AUTH_USER_EXISTS = 'User with this email exists.';
export const AUTH_USER_NOT_FOUND = 'User not found.';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong.';

export const AUTHENTICATION_RESPONSE_MESSAGES = {
  LOGGED_SUCCESS: 'User has been successfully logged.',
  LOGGED_ERROR: 'Password or Login is wrong.',
  USER_FOUND: 'User found',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'User is unauthorised',
  USER_EXIST: 'User with the email already exists',
  USER_CREATED: 'The new user has been successfully created.',
  USER_AVATAR: 'The new user avatar has been successfully uploaded.',
  USER_PASSWORD: 'The new user password has been successfully updated.',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;
