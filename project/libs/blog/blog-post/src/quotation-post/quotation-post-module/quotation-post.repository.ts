import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPaginationResult, IQuotationPost } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { QuotationPostEntity } from './quotation-post.entity';
import { QuotationPostFactory } from './quotation-post.factory';
import { QuotationPostQuery } from './quotation-post.query';

@Injectable()
export class QuotationPostRepository extends BasePostgresRepository<QuotationPostEntity, IQuotationPost> {
  constructor(
    entityFactory: QuotationPostFactory,
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

  public async save(entity: QuotationPostEntity): Promise<QuotationPostEntity> {
    const post = entity.toPOJO();
    const record = await this.client.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        ...post,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        likes: post.likes ? {
          create: post.likes
        } : undefined,
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    // entity.id = record.id;
    return await this.createEntityFromDocument(record as IQuotationPost);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<QuotationPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as IQuotationPost);
  }

  public async update(entity: QuotationPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        tags: pojoEntity.tags,
      },
      include: {
        comments: true,
        likes: true,
      }
    });
  }

  public async find(query?: QuotationPostQuery): Promise<IPaginationResult<QuotationPostEntity>> {
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
          likes: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as IQuotationPost)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
