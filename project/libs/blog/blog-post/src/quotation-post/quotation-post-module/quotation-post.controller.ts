import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { QuotationPostRdo } from '../rdo/quotation-post.rdo';
import { QuotationPostService } from './quotation-post.service';
import { PostResponseMessage } from '../../post.constant';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { QuotationPostWithPaginationRdo } from '../rdo/quotation-post-with-pagination.rdo';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';
import { QuotationPostQuery } from './quotation-post.query';

@ApiTags('quotation-post')
@Controller('posts/quotation')
export class QuotationPostController {
  constructor(
    private readonly quotationPostService: QuotationPostService
  ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: QuotationPostRdo,
    description: PostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateQuotationPostDto, @Param() userId: string): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.createPost(dto, userId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<QuotationPostRdo> {
    const foundPost = await this.quotationPostService.findPostById(id);
    return fillDto(QuotationPostRdo, foundPost.toPOJO());
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
  @Get('/')
  public async index(@Query() query: QuotationPostQuery): Promise<QuotationPostWithPaginationRdo> {
    const postsWithPagination = await this.quotationPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(QuotationPostWithPaginationRdo, result);
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
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body(new ValidationPipe()) dto: UpdateQuotationPostDto): Promise<QuotationPostRdo> {
    const updatedPost = await this.quotationPostService.updatePost(userId, postId, dto);
    return fillDto(QuotationPostRdo, updatedPost.toPOJO());
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
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<void> {
    await this.quotationPostService.deletePost(userId, postId);
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
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<QuotationPostRdo> {
    const newPost = await this.quotationPostService.repostPost(userId, postId);
    return fillDto(QuotationPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.quotationPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
