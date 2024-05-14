import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogCommentEntity, BlogCommentFactory, BlogCommentRepository, CreateCommentDto } from '@project/blog-comment';
import { IPaginationResult } from '@project/core';

import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPostRepository } from './photo-post.repository';
import { POST_CONFLICT, POST_NOT_FOUND, POST_OPERATION_PERMISSION } from '../../post.constant';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';
import { PhotoPostQuery } from './photo-post.query';

@Injectable()
export class PhotoPostService {
  constructor(
    private readonly photoPostRepository: PhotoPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: PhotoPostQuery): Promise<IPaginationResult<PhotoPostEntity>> {
    return this.photoPostRepository.find(query);
  }

  public async createPost(dto: CreatePhotoPostDto, userId: string): Promise<PhotoPostEntity> {
    const postEntity = new PhotoPostEntity(dto, userId);
    return await this.photoPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<PhotoPostEntity> {
    const post = await this.photoPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdatePhotoPostDto): Promise<PhotoPostEntity> {
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
      await this.photoPostRepository.update(existPost);

      return existPost;
    }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.photoPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(POST_OPERATION_PERMISSION);
    }

    try {
      await this.photoPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<PhotoPostEntity> {
    const existPost = await this.findPostById(offerId);

    if (existPost?.isRepost) {
      throw new ConflictException(POST_CONFLICT);
    }

    existPost.originalId = existPost.id;
    existPost.updatedAt = new Date();
    existPost.originalUserId = existPost.userId;
    existPost.userId = userId;
    existPost.isRepost = true;
    await this.photoPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
