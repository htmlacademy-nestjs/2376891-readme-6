import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, Query, HttpCode, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';

import { BlogPostService } from '../blog-post.service';
import { BlogPostQuery } from '../blog-post.query';
import { BlogPostResponseMessage } from '../blog-post.constant';
import { VideoPostRdo } from '../rdo/video-post.rdo';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { VideoPostWithPaginationRdo } from '../rdo/video-post-with-pagination.rdo';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';

@ApiTags('posts')
@Controller('posts/video')
export class VideoPostController {
  constructor( private readonly blogPostService: BlogPostService ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: VideoPostRdo,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateVideoPostDto, @Param() userId: string): Promise<VideoPostRdo> {
    const newPost = await this.blogPostService.createPost(dto, userId);
    return fillDto(VideoPostRdo, newPost.toVideoPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<VideoPostRdo> {
    const foundPost = await this.blogPostService.findPostById(id);
    return fillDto(VideoPostRdo, foundPost.toVideoPOJO());
  }

  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery): Promise<VideoPostWithPaginationRdo> {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toVideoPOJO()),
    }
    return fillDto(VideoPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: VideoPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdateVideoPostDto): Promise<VideoPostRdo> {
    const updatedPost = await this.blogPostService.updatePost(userId, postId, dto);
    return fillDto(VideoPostRdo, updatedPost.toVideoPOJO());
  }

  @ApiResponse({
    type: VideoPostRdo,
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
    // return fillDto(VideoPostRdo, deletedPost.toVideoPOJO());
  }

  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Post(':userId/:postId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<VideoPostRdo> {
    const newPost = await this.blogPostService.repostPost(userId, postId);
    return fillDto(VideoPostRdo, newPost.toVideoPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
