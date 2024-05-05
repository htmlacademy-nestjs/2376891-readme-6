import { Injectable } from '@nestjs/common';

import { IEntityFactory, ITextPost } from '@project/core';
import { TextPostEntity } from './text-post.entity';
import { CreateTextPostDto } from '../dto/create-text-post.dto';

@Injectable()
export class TextPostFactory implements IEntityFactory<TextPostEntity> {
  public create(entityPlainData: ITextPost): TextPostEntity {
    return new TextPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreateTextPostDto): TextPostEntity {
    const entity = new TextPostEntity();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
