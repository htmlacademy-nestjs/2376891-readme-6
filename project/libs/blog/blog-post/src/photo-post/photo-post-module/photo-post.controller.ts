import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { PhotoPostService } from './photo-post.service';
import { PhotoPostRdo } from '../rdo/photo-post.rdo';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';
import { PostResponseMessage } from '../../post.constant';
import { PhotoPostWithPaginationRdo } from '../rdo/photo-post-with-pagination.rdo';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { PhotoPostQuery } from './photo-post.query';

@ApiTags('photo-post')
@Controller('posts/photo')
export class PhotoPostController {
  constructor(
    private readonly photoPostService: PhotoPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PhotoPostRdo,
    description: PostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('/')
  public async create(@Body(new ValidationPipe()) dto: CreatePhotoPostDto, @Param() userId: string): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.createPost(dto, userId);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get(':id')
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<PhotoPostRdo> {
    const foundPost = await this.photoPostService.findPostById(id);
    return fillDto(PhotoPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: PhotoPostQuery): Promise<PhotoPostWithPaginationRdo> {
    const postsWithPagination = await this.photoPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(PhotoPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PhotoPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdatePhotoPostDto): Promise<PhotoPostRdo> {
    const updatedPost = await this.photoPostService.updatePost(userId, postId, dto);
    return fillDto(PhotoPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
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
    await this.photoPostService.deletePost(userId, postId);
    // return fillDto(LinkPostRdo, deletedPost.toPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.repostPost(userId, postId);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    // description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    // description: PostResponseMessage.PostNotFound,
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.photoPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
