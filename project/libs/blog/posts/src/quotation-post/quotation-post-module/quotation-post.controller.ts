import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { QuotationPostService } from './quotation-post.service';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { QuotationPostRdo } from '../rdo/quotation-post.rdo';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';

@Controller('posts/quotation')
export class QuotationPostController {
  constructor(
    private readonly quotationPostService: QuotationPostService
  ) { }

  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateQuotationPostDto): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.createPost(dto, userId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<QuotationPostRdo> {
    const foundPost = await this.quotationPostService.findPostById(id);
    return fillDto(QuotationPostRdo, foundPost.toPOJO());
  }

  @Patch(':userId/:offerId')
  public async update(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string,
    @Body() dto: UpdateQuotationPostDto): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.updatePost(userId, offerId, dto);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<QuotationPostRdo> {
    const deletedPost = await this.quotationPostService.deletePost(userId, offerId);
    return fillDto(QuotationPostRdo, deletedPost.toPOJO());
  }

  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.repostPost(userId, offerId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }
}
