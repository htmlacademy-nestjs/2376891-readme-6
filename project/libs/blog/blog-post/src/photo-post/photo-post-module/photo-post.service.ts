import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { PhotoPostRepository } from './photo-post.repository';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { PhotoPostEntity } from './photo-post.entity';
import { PHOTO_POST_CONFLICT, PHOTO_POST_NOT_FOUND, PHOTO_POST_OPERATION_PERMISSION } from './photo-post.constant';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';

@Injectable()
export class PhotoPostService {
  constructor(
    private readonly photoPostRepository: PhotoPostRepository
  ) { }

  public async createPost(dto: CreatePhotoPostDto, userId: string): Promise<PhotoPostEntity> {
    const { tags, photo } = dto;

    const blogPost = { tags, photo, userId };

    const postEntity = new PhotoPostEntity(blogPost);
    await this.photoPostRepository.save(postEntity);

    return postEntity;
  }

  public async findPostById(id: string): Promise<PhotoPostEntity> {
    const post = await this.photoPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(PHOTO_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdatePhotoPostDto) {
    const { tags, photo, updatedAt } = dto;
    const existPost = await this.findPostById(offerId);

    if (existPost.userId !== userId) {
      throw new UnauthorizedException(PHOTO_POST_OPERATION_PERMISSION);
    }

    const updatedPost = { ...existPost, updatedAt: updatedAt ?? new Date(), tags, photo };
    const postEntity = await new PhotoPostEntity(updatedPost);
    await this.photoPostRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(userId: string, offerId: string) {
    const deletedPost = await this.photoPostRepository.findById(offerId);
    if (deletedPost.userId !== userId) {
      throw new UnauthorizedException(PHOTO_POST_OPERATION_PERMISSION);
    }

    await this.photoPostRepository.deleteById(offerId);
    return deletedPost;
  }

  public async repostPost(userId: string, offerId: string) {
    const post = await this.findPostById(offerId);
    const { id, createdAt, tags, photo } = post;

    if (post?.isRepost) {
      throw new ConflictException(PHOTO_POST_CONFLICT);
    }

    const blogPost = {
      originalId: id,
      id: '',
      createdAt,
      updatedAt: new Date(),
      tags, photo,
      originalUserId: post.userId,
      userId,
      isRepost: true,
    };

    const postEntity = await new PhotoPostEntity(blogPost);
    await this.photoPostRepository.save(postEntity);

    return postEntity;
  }
}
