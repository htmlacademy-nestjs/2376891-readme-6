import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogCommentEntity, BlogCommentFactory, BlogCommentRepository, CreateCommentDto } from '@project/blog-comment';
import { IPaginationResult } from '@project/core';
import { QuotationPostQuery } from './quotation-post.query';
import { QuotationPostRepository } from './quotation-post.repository';
import { QuotationPostEntity } from './quotation-post.entity';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { POST_CONFLICT, POST_NOT_FOUND, POST_OPERATION_PERMISSION } from '../../post.constant';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';

@Injectable()
export class QuotationPostService {
  constructor(
    private readonly quotationPostRepository: QuotationPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: QuotationPostQuery): Promise<IPaginationResult<QuotationPostEntity>> {
    return this.quotationPostRepository.find(query);
  }

  public async createPost(dto: CreateQuotationPostDto, userId: string): Promise<QuotationPostEntity> {
    const postEntity = new QuotationPostEntity(dto, userId);
    return await this.quotationPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<QuotationPostEntity> {
    const post = await this.quotationPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateQuotationPostDto): Promise<QuotationPostEntity> {
      const existPost = await this.findPostById(offerId);
      let hasChanges = false;

      if (existPost.userId !== userId) {
        throw new UnauthorizedException(POST_OPERATION_PERMISSION);
      }

      for (const [key, value] of Object.entries(dto)) {
        if (value !== undefined && existPost[key] !== value) {
          existPost[key] = value;
          hasChanges = true;
        }
      }

      if (!hasChanges) {
        return existPost;
      }
      await this.quotationPostRepository.update(existPost);

      return existPost;
    }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.quotationPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(POST_OPERATION_PERMISSION);
    }

    try {
      await this.quotationPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<QuotationPostEntity> {
    const existPost = await this.findPostById(offerId);

    if (existPost?.isRepost) {
      throw new ConflictException(POST_CONFLICT);
    }

    existPost.originalId = existPost.id;
    existPost.updatedAt = new Date();
    existPost.originalUserId = existPost.userId;
    existPost.userId = userId;
    existPost.isRepost = true;
    await this.quotationPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
