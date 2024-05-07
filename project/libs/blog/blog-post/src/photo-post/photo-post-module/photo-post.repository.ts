import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPaginationResult, IPhotoPost } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPostFactory } from './photo-post.factory';
import { PhotoPostQuery } from './photo-post.query';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity, IPhotoPost> {
  constructor(
    entityFactory: PhotoPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const record = await this.client.post.create({
      data: {
        ...entity.toPOJO(),
        comments: {
          connect: [],
        },
      },
      include: {
        comments: true,
      }
    });

    // entity.id = record.id;
    return await this.createEntityFromDocument(record);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<PhotoPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        // likes: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(entity: PhotoPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        tags: pojoEntity.tags,
      },
      include: {
        comments: true,
        // likes: true,
      }
    });
  }

  public async find(query?: PhotoPostQuery): Promise<IPaginationResult<PhotoPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          comments: true,
          // likes: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
