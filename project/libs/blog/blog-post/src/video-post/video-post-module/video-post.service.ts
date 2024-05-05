import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogCommentEntity, BlogCommentFactory, BlogCommentRepository, CreateCommentDto } from '@project/blog-comment';
import { IPaginationResult } from '@project/core';
import { VideoPostRepository } from './video-post.repository';
import { VideoPostQuery } from './video-post.query';
import { VideoPostEntity } from './video-post.entity';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { POST_CONFLICT, POST_NOT_FOUND, POST_OPERATION_PERMISSION } from '../../post.constant';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) { }

  public async getAllPosts(query?: VideoPostQuery): Promise<IPaginationResult<VideoPostEntity>> {
    return this.videoPostRepository.find(query);
  }

  public async createPost(dto: CreateVideoPostDto, userId: string): Promise<VideoPostEntity> {
    const postEntity = new VideoPostEntity(dto, userId);
    return await this.videoPostRepository.save(postEntity);
  }

  public async findPostById(id: string): Promise<VideoPostEntity> {
    const post = await this.videoPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateVideoPostDto): Promise<VideoPostEntity> {
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
      await this.videoPostRepository.update(existPost);

      return existPost;
    }

  public async deletePost(userId: string, offerId: string): Promise<void> {
    const deletedPost = await this.videoPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(POST_OPERATION_PERMISSION);
    }

    try {
      await this.videoPostRepository.deleteById(offerId);
    } catch {
      throw new NotFoundException(`Post with ID ${offerId} not found`);
    }
  }

  public async repostPost(userId: string, offerId: string): Promise<VideoPostEntity> {
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

    // const postEntity = await new VideoPostEntity(blogPost);
    await this.videoPostRepository.save(existPost);

    return existPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.findPostById(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
