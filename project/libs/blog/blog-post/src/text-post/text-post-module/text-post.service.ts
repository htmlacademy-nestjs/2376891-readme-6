import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogCommentEntity, BlogCommentFactory, BlogCommentRepository, CreateCommentDto } from '@project/blog-comment';
import { IPaginationResult } from '@project/core';
import { TextPostRepository } from './text-post.repository';
import { TextPostQuery } from './text-post.query';
import { TextPostEntity } from './text-post.entity';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { POST_CONFLICT, POST_NOT_FOUND, POST_OPERATION_PERMISSION } from '../../post.constant';
import { UpdateTextPostDto } from '../dto/update-text-post.dto';

@Injectable()
export class TextPostService {
  constructor(
    private readonly textPostRepository: TextPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: TextPostQuery): Promise<IPaginationResult<TextPostEntity>> {
    return this.textPostRepository.find(query);
  }

  public async createPost(dto: CreateTextPostDto, userId: string): Promise<TextPostEntity> {
    const postEntity = new TextPostEntity(dto, userId);
    return await this.textPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<TextPostEntity> {
    const post = await this.textPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateTextPostDto): Promise<TextPostEntity> {
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
      await this.textPostRepository.update(existPost);

      return existPost;
    }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.textPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(POST_OPERATION_PERMISSION);
    }

    try {
      await this.textPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<TextPostEntity> {
    const existPost = await this.findPostById(offerId);

    if (existPost?.isRepost) {
      throw new ConflictException(POST_CONFLICT);
    }

    existPost.originalId = existPost.id;
    existPost.updatedAt = new Date();
    existPost.originalUserId = existPost.userId;
    existPost.userId = userId;
    existPost.isRepost = true;
    // const blogPost = {
    //   originalId: id,
    //   id: '',
    //   createdAt,
    //   updatedAt: new Date(),
    //   tags, url, description,
    //   originalUserId: existPost.userId,
    //   userId,
    //   isRepost: true,
    // };

    // const postEntity = await new TextPostEntity(blogPost);
    await this.textPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
