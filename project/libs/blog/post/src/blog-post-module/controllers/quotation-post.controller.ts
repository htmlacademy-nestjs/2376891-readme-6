import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, Query, HttpCode, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';

import { BlogPostService } from '../blog-post.service';
import { BlogPostQuery } from '../blog-post.query';
import { BlogPostResponseMessage } from '../blog-post.constant';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';
import { UpdateQuotationPostDto } from '../dto/update-quotation-post.dto';
import { QuotationPostRdo } from '../rdo/quotation-post.rdo';
import { QuotationPostWithPaginationRdo } from '../rdo/quotation-post-with-pagination.rdo';

@ApiTags('posts')
@Controller('posts/quotation')
export class QuotationPostController {
  constructor( private readonly blogPostService: BlogPostService ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: QuotationPostRdo,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateQuotationPostDto, @Param() userId: string): Promise<QuotationPostRdo> {
    const newPost = await this.blogPostService.createPost(dto, userId);
    return fillDto(QuotationPostRdo, newPost.toQuotationPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<QuotationPostRdo> {
    const foundPost = await this.blogPostService.findPostById(id);
    return fillDto(QuotationPostRdo, foundPost.toQuotationPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery): Promise<QuotationPostWithPaginationRdo> {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toQuotationPOJO()),
    }
    return fillDto(QuotationPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Patch(':userId/:postId')
  public async update(
    @Param('userId') userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body(new ValidationPipe()) dto: UpdateQuotationPostDto): Promise<QuotationPostRdo> {
    const updatedPost = await this.blogPostService.updatePost(userId, postId, dto);
    return fillDto(QuotationPostRdo, updatedPost.toQuotationPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Delete(':userId/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<void> {
    await this.blogPostService.deletePost(userId, postId);
    // return fillDto(QuotationPostRdo, deletedPost.toQuotationPOJO());
  }

  @ApiResponse({
    type: QuotationPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Post(':userId/:postId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<QuotationPostRdo> {
    const newPost = await this.blogPostService.repostPost(userId, postId);
    return fillDto(QuotationPostRdo, newPost.toQuotationPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
