import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { LinkPostEntity } from './link-post.entity';
import { LinkPostRepository } from './link-post.repository';
import { POST_CONFLICT, POST_NOT_FOUND, POST_OPERATION_PERMISSION } from '../../post.constant';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';
import { BlogCommentEntity, BlogCommentFactory, BlogCommentRepository, CreateCommentDto } from '@project/blog-comment';
import { LinkPostQuery } from './link-post.query';
import { IPaginationResult } from '@project/core';

@Injectable()
export class LinkPostService {
  constructor(
    private readonly linkPostRepository: LinkPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: LinkPostQuery): Promise<IPaginationResult<LinkPostEntity>> {
    return this.linkPostRepository.find(query);
  }

  public async createPost(dto: CreateLinkPostDto, userId: string): Promise<LinkPostEntity> {
    const postEntity = new LinkPostEntity(dto, userId);
    return await this.linkPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<LinkPostEntity> {
    const post = await this.linkPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateLinkPostDto): Promise<LinkPostEntity> {
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
      await this.linkPostRepository.update(existPost);

      return existPost;
    }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.linkPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(POST_OPERATION_PERMISSION);
    }

    try {
      await this.linkPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<LinkPostEntity> {
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

    // const postEntity = await new LinkPostEntity(blogPost);
    await this.linkPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
