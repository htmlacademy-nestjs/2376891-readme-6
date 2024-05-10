import { Entity, IJwtToken, IStorableEntity } from '@project/core';

export class RefreshTokenEntity extends Entity implements IStorableEntity<IJwtToken> {
  public tokenId: string;
  public createdAt: Date;
  public userId: string;
  public expiresIn: Date;

  constructor(token?: IJwtToken) {
    super();
    this.populate(token);
  }

  public populate(token?: IJwtToken): void {
    if (!token) {
      return;
    }

    this.id = token.id ?? '';
    this.createdAt = token.createdAt;
    this.expiresIn = token.expiresIn;
    this.userId = token.userId;
    this.tokenId = token.tokenId;
  }

  public toPOJO(): IJwtToken {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      userId: this.userId,
      tokenId: this.tokenId,
    }
  }
}
