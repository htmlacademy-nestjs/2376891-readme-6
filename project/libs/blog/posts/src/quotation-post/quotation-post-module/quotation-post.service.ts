import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { QuotationPostRepository } from './quotation-post.repository';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { QuotationPostEntity } from './quotation-post.entity';
import { QUOTATION_POST_CONFLICT, QUOTATION_POST_NOT_FOUND, QUOTATION_POST_OPERATION_PERMISSION } from './quotation-post.constant';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';

@Injectable()
export class QuotationPostService {
  constructor(
    private readonly quotationPostRepository: QuotationPostRepository
  ) { }

  public async createPost(dto: CreateQuotationPostDto, userId: string): Promise<QuotationPostEntity> {
    const { tags, text, quotationAuthor } = dto;

    const blogPost = { tags, text, quotationAuthor, author: userId };

    const postEntity = new QuotationPostEntity(blogPost);
    await this.quotationPostRepository.save(postEntity);

    return postEntity;
  }

  public async findPostById(id: string): Promise<QuotationPostEntity> {
    const post = await this.quotationPostRepository.findById(id);

    if (!post) {
      throw new NotFoundException(QUOTATION_POST_NOT_FOUND);
    }

    return post;
  }

  public async updatePost(userId: string, offerId: string, dto: UpdateQuotationPostDto) {
    const { tags, text, quotationAuthor, publicationDate } = dto;
    const existPost = await this.findPostById(offerId);

    if (existPost.author !== userId) {
      throw new UnauthorizedException(QUOTATION_POST_OPERATION_PERMISSION);
    }

    const updatedPost = { ...existPost, publicationDate: publicationDate ?? new Date(), tags, text, quotationAuthor };
    const postEntity = await new QuotationPostEntity(updatedPost);
    await this.quotationPostRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(userId: string, offerId: string) {
    const deletedPost = await this.quotationPostRepository.findById(offerId);
    if (deletedPost.author !== userId) {
      throw new UnauthorizedException(QUOTATION_POST_OPERATION_PERMISSION);
    }

    await this.quotationPostRepository.deleteById(offerId);
    return deletedPost;
  }

  public async repostPost(userId: string, offerId: string) {
    const post = await this.findPostById(offerId);
    const { id, creationDate, tags, text, quotationAuthor, author } = post;

    if (post?.isRepost) {
      throw new ConflictException(QUOTATION_POST_CONFLICT);
    }

    const blogPost = {
      originalId: id,
      id: '',
      creationDate,
      publicationDate: new Date(),
      tags, text, quotationAuthor,
      originalAuthor: author,
      author: userId,
      isRepost: true,
    };

    const postEntity = await new QuotationPostEntity(blogPost);
    await this.quotationPostRepository.save(postEntity);

    return postEntity;
  }
}
