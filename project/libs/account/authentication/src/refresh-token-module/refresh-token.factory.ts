import { Injectable } from '@nestjs/common';

import { IJwtToken, IEntityFactory } from '@project/core';

import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenFactory implements IEntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: IJwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
