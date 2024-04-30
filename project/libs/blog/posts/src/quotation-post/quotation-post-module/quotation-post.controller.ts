import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { QuotationPostService } from './quotation-post.service';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { QuotationPostRdo } from '../rdo/quotation-post.rdo';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';
import { PostResponseMessage } from '../../post.constant';

@ApiTags('quotation-post')
@Controller('posts/quotation')
export class QuotationPostController {
  constructor(
    private readonly quotationPostService: QuotationPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
  })
  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateQuotationPostDto): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.createPost(dto, userId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string): Promise<QuotationPostRdo> {
    const foundPost = await this.quotationPostService.findPostById(id);
    return fillDto(QuotationPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Patch(':userId/:offerId')
  public async update(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string,
    @Body() dto: UpdateQuotationPostDto): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.updatePost(userId, offerId, dto);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<QuotationPostRdo> {
    const deletedPost = await this.quotationPostService.deletePost(userId, offerId);
    return fillDto(QuotationPostRdo, deletedPost.toPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.repostPost(userId, offerId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }
}
