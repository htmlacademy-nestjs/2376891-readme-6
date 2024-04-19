import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { LinkPostEntity } from './link-post.entity';
import { LinkPostRepository } from './link-post.repository';
import { LINK_POST_CONFLICT, LINK_POST_NOT_FOUND, LINK_POST_OPERATION_PERMISSION } from './link-post.constant';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';

@Injectable()
export class LinkPostService {
  constructor(
    private readonly linkPostRepository: LinkPostRepository
  ) { }

  public async createPost(dto: CreateLinkPostDto, userId: string): Promise<LinkPostEntity> {
    const { tags, url, description } = dto;

    const blogPost = { tags, url, description, author: userId };

    const postEntity = new LinkPostEntity(blogPost);
    await this.linkPostRepository.save(postEntity);

    return postEntity;
  }

  public async findPostById(id: string): Promise<LinkPostEntity> {
    const post = await this.linkPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(LINK_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateLinkPostDto) {
    const { tags, url, description, publicationDate } = dto;
    const existPost = await this.findPostById(offerId);

    if (existPost.author !== userId) {
      throw new UnauthorizedException(LINK_POST_OPERATION_PERMISSION);
    }

    const updatedPost = { ...existPost, publicationDate: publicationDate ?? new Date(), tags, url, description };
    const postEntity = await new LinkPostEntity(updatedPost);
    await this.linkPostRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(userId: string, offerId: string) {
    const deletedPost = await this.linkPostRepository.findById(offerId);
    if (deletedPost.author !== userId) {
      throw new UnauthorizedException(LINK_POST_OPERATION_PERMISSION);
    }

    await this.linkPostRepository.deleteById(offerId);
    return deletedPost;
  }

  public async repostPost(userId: string, offerId: string) {
    const post = await this.findPostById(offerId);
    const { id, creationDate, tags, url, description, author } = post;

    if (post?.isRepost) {
      throw new ConflictException(LINK_POST_CONFLICT);
    }

    const blogPost = {
      originalId: id,
      id: '',
      creationDate,
      publicationDate: new Date(),
      tags, url, description,
      originalAuthor: author,
      author: userId,
      isRepost: true,
    };

    const postEntity = await new LinkPostEntity(blogPost);
    await this.linkPostRepository.save(postEntity);

    return postEntity;
  }
}
