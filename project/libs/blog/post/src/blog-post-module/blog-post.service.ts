import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ICommonPost, IPaginationResult } from '@project/core';
import { BlogCommentRepository, CreateCommentDto, BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostQuery } from './blog-post.query';
import { BLOG_POST_CONFLICT, BLOG_POST_NOT_FOUND, BLOG_POST_OPERATION_PERMISSION } from './blog-post.constant';
import { UpdateCommonPostDto } from './dto/update-common-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: BlogPostQuery): Promise<IPaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(post: ICommonPost, userId: string): Promise<BlogPostEntity> {
    const postEntity = new BlogPostEntity(post, userId);
    return await this.blogPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(BLOG_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateCommonPostDto): Promise<BlogPostEntity> {
    const existPost = await this.findPostById(offerId);
    let hasChanges = false;

    if (existPost.userId !== userId) {
      throw new UnauthorizedException(BLOG_POST_OPERATION_PERMISSION);
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
    await this.blogPostRepository.update(existPost);
    return existPost;
  }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.blogPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(BLOG_POST_OPERATION_PERMISSION);
    }

    try {
      await this.blogPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<BlogPostEntity>  {
    const existPost = await this.findPostById(offerId);

    if (existPost?.isRepost) {
      throw new ConflictException(BLOG_POST_CONFLICT);
    }

    existPost.originalId = existPost.id;
    existPost.updatedAt = new Date();
    existPost.originalUserId = existPost.userId;
    existPost.userId = userId;
    existPost.isRepost = true;

    await this.blogPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
