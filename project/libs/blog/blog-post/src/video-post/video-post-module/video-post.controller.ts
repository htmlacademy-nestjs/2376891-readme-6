import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { VideoPostService } from './video-post.service';
import { VideoPostRdo } from '../rdo/video-post.rdo';
import { PostResponseMessage } from '../../post.constant';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';
import { VideoPostWithPaginationRdo } from '../rdo/video-post-with-pagination.rdo';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { VideoPostQuery } from './video-post.query';

@ApiTags('video-post')
@Controller('posts/video')
export class VideoPostController {
  constructor(
    private readonly videoPostService: VideoPostService
  ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: VideoPostRdo,
    description: PostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateVideoPostDto, @Param() userId: string): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.createPost(dto, userId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<VideoPostRdo> {
    const foundPost = await this.videoPostService.findPostById(id);
    return fillDto(VideoPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: VideoPostQuery): Promise<VideoPostWithPaginationRdo> {
    const postsWithPagination = await this.videoPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(VideoPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: VideoPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdateVideoPostDto): Promise<VideoPostRdo> {
    const updatedPost = await this.videoPostService.updatePost(userId, postId, dto);
    return fillDto(VideoPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: VideoPostRdo,
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
    await this.videoPostService.deletePost(userId, postId);
  }

  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.repostPost(userId, postId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
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
    const newComment = await this.videoPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
