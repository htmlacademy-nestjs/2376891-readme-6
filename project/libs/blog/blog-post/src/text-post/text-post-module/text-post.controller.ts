import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { TextPostService } from './text-post.service';
import { TextPostRdo } from '../rdo/text-post.rdo';
import { PostResponseMessage } from '../../post.constant';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { TextPostWithPaginationRdo } from '../rdo/text-post-with-pagination.rdo';
import { UpdateTextPostDto } from '../dto/update-text-post.dto';
import { TextPostQuery } from './text-post.query';

@ApiTags('text-post')
@Controller('posts/text')
export class TextPostController {
  constructor(
    private readonly textPostService: TextPostService
  ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TextPostRdo,
    description: PostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateTextPostDto, @Param() userId: string): Promise<TextPostRdo> {
    const newPost = await this.textPostService.createPost(dto, userId);
    return fillDto(TextPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<TextPostRdo> {
    const foundPost = await this.textPostService.findPostById(id);
    return fillDto(TextPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: TextPostQuery): Promise<TextPostWithPaginationRdo> {
    const postsWithPagination = await this.textPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(TextPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: TextPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdateTextPostDto): Promise<TextPostRdo> {
    const updatedPost = await this.textPostService.updatePost(userId, postId, dto);
    return fillDto(TextPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
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
    await this.textPostService.deletePost(userId, postId);
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<TextPostRdo> {
    const newPost = await this.textPostService.repostPost(userId, postId);
    return fillDto(TextPostRdo, newPost.toPOJO());
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
    const newComment = await this.textPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
