import { Injectable } from '@nestjs/common';

import { IEntityFactory, ILinkPost } from '@project/core';
import { LinkPostEntity } from './link-post.entity';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';

@Injectable()
export class LinkPostFactory implements IEntityFactory<LinkPostEntity> {
  public create(entityPlainData: ILinkPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreateLinkPostDto): LinkPostEntity {
    const entity = new LinkPostEntity();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
