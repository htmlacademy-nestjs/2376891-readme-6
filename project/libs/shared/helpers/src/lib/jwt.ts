import { IUser, ITokenPayload } from '@project/core';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}
