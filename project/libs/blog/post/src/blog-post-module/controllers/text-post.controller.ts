import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, Query, HttpCode, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';

import { BlogPostService } from '../blog-post.service';
import { BlogPostQuery } from '../blog-post.query';
import { BlogPostResponseMessage } from '../blog-post.constant';
import { TextPostRdo } from '../rdo/text-post.rdo';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { TextPostWithPaginationRdo } from '../rdo/text-post-with-pagination.rdo';
import { UpdateTextPostDto } from '../dto/update-text-post.dto';

@ApiTags('posts')
@Controller('posts/text')
export class TextPostController {
  constructor( private readonly blogPostService: BlogPostService ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TextPostRdo,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateTextPostDto, @Param() userId: string): Promise<TextPostRdo> {
    const newPost = await this.blogPostService.createPost(dto, userId);
    return fillDto(TextPostRdo, newPost.toTextPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<TextPostRdo> {
    const foundPost = await this.blogPostService.findPostById(id);
    return fillDto(TextPostRdo, foundPost.toTextPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery): Promise<TextPostWithPaginationRdo> {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toTextPOJO()),
    }
    return fillDto(TextPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: TextPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdateTextPostDto): Promise<TextPostRdo> {
    const updatedPost = await this.blogPostService.updatePost(userId, postId, dto);
    return fillDto(TextPostRdo, updatedPost.toTextPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
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
    // return fillDto(TextPostRdo, deletedPost.toTextPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Post(':userId/:postId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<TextPostRdo> {
    const newPost = await this.blogPostService.repostPost(userId, postId);
    return fillDto(TextPostRdo, newPost.toTextPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
