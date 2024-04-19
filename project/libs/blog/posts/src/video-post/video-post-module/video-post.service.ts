import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { VideoPostRepository } from './video-post.repository';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { VideoPostEntity } from './video-post.entity';
import { VIDEO_POST_CONFLICT, VIDEO_POST_NOT_FOUND, VIDEO_POST_OPERATION_PERMISSION } from './video-post.constant';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository
  ) { }

  public async createPost(dto: CreateVideoPostDto, userId: string): Promise<VideoPostEntity> {
    const { tags, name, url } = dto;

    const blogPost = { tags, name, url, author: userId };

    const postEntity = new VideoPostEntity(blogPost);
    await this.videoPostRepository.save(postEntity);

    return postEntity;
  }

  public async findPostById(id: string): Promise<VideoPostEntity> {
    const post = await this.videoPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(VIDEO_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateVideoPostDto) {
    const { tags, name, url, publicationDate } = dto;
    const existPost = await this.findPostById(offerId);

    if (existPost.author !== userId) {
      throw new UnauthorizedException(VIDEO_POST_OPERATION_PERMISSION);
    }

    const updatedPost = { ...existPost, publicationDate: publicationDate ?? new Date(), tags, name, url };
    const postEntity = await new VideoPostEntity(updatedPost);
    await this.videoPostRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(userId: string, offerId: string) {
    const deletedPost = await this.videoPostRepository.findById(offerId);
    if (deletedPost.author !== userId) {
      throw new UnauthorizedException(VIDEO_POST_OPERATION_PERMISSION);
    }

    await this.videoPostRepository.deleteById(offerId);
    return deletedPost;
  }

  public async repostPost(userId: string, offerId: string) {
    const post = await this.findPostById(offerId);
    const { id, creationDate, tags, name, url, author } = post;

    if (post?.isRepost) {
      throw new ConflictException(VIDEO_POST_CONFLICT);
    }

    const blogPost = {
      originalId: id,
      id: '',
      creationDate,
      publicationDate: new Date(),
      tags, name, url,
      originalAuthor: author,
      author: userId,
      isRepost: true,
    };

    const postEntity = await new VideoPostEntity(blogPost);
    await this.videoPostRepository.save(postEntity);

    return postEntity;
  }
}
