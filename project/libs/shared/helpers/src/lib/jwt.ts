import { IUser, ITokenPayload } from '@project/core';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.id,
    email: user.email,
    // role: user.role,
    name: user.name,
    // lastname: user.lastname,
    // firstname: user.firstname,
  };
}
