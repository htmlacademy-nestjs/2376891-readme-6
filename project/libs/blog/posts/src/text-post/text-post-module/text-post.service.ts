import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { TextPostRepository } from './text-post.repository';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { TextPostEntity } from './text-post.entity';
import { TEXT_POST_CONFLICT, TEXT_POST_NOT_FOUND, TEXT_POST_OPERATION_PERMISSION } from './text-post.constant';
import { UpdateTextPostDto } from '../dto/update-text-post.dto';

@Injectable()
export class TextPostService {
  constructor(
    private readonly textPostRepository: TextPostRepository
  ) { }

  public async createPost(dto: CreateTextPostDto, userId: string): Promise<TextPostEntity> {
    const { tags, name, title, text } = dto;

    const blogPost = { tags, name, title, text, userId };

    const postEntity = new TextPostEntity(blogPost);
    await this.textPostRepository.save(postEntity);

    return postEntity;
  }

  public async findPostById(id: string): Promise<TextPostEntity> {
    const post = await this.textPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(TEXT_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateTextPostDto) {
    const { tags, name, title, text, updatedAt } = dto;
    const existPost = await this.findPostById(offerId);

    if (existPost.userId !== userId) {
      throw new UnauthorizedException(TEXT_POST_OPERATION_PERMISSION);
    }

    const updatedPost = { ...existPost, updatedAt: updatedAt ?? new Date(), tags, name, title, text };
    const postEntity = await new TextPostEntity(updatedPost);
    await this.textPostRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(userId: string, offerId: string) {
    const deletedPost = await this.textPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(TEXT_POST_OPERATION_PERMISSION);
    }

    await this.textPostRepository.deleteById(offerId);
    return deletedPost;
  }

  public async repostPost(userId: string, offerId: string) {
    const post = await this.findPostById(offerId);
    const { id, createdAt, tags, name, title, text } = post;

    if (post?.isRepost) {
      throw new ConflictException(TEXT_POST_CONFLICT);
    }

    const blogPost = {
      originalId: id,
      id: '',
      createdAt,
      updatedAt: new Date(),
      tags, name, title, text,
      originalUserId: post.userId,
      userId,
      isRepost: true,
    };

    const postEntity = await new TextPostEntity(blogPost);
    await this.textPostRepository.save(postEntity);

    return postEntity;
  }
}
