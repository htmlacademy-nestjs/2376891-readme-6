import { compare, genSalt, hash } from 'bcrypt';

import { Entity, IStorableEntity, IAuthUser } from '@project/core';

import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements IStorableEntity<IAuthUser> {
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user: IAuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: IAuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): IAuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
