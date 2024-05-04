import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, Query, HttpCode, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';

import { BlogPostService } from '../blog-post.service';
import { PhotoPostRdo } from '../rdo/photo-post.rdo';
import { BlogPostQuery } from '../blog-post.query';
import { BlogPostResponseMessage } from '../blog-post.constant';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';
import { PhotoPostWithPaginationRdo } from '../rdo/photo-posr-with-pagination.rdo';

@ApiTags('posts')
@Controller('posts/photo')
export class PhotoPostController {
  constructor( private readonly blogPostService: BlogPostService ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PhotoPostRdo,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreatePhotoPostDto, @Param() userId: string): Promise<PhotoPostRdo> {
    const newPost = await this.blogPostService.createPost(dto, userId);
    return fillDto(PhotoPostRdo, newPost.toPhotoPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<PhotoPostRdo> {
    const foundPost = await this.blogPostService.findPostById(id);
    return fillDto(PhotoPostRdo, foundPost.toPhotoPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery): Promise<PhotoPostWithPaginationRdo> {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPhotoPOJO()),
    }
    return fillDto(PhotoPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PhotoPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdatePhotoPostDto): Promise<PhotoPostRdo> {
    const updatedPost = await this.blogPostService.updatePost(userId, postId, dto);
    return fillDto(PhotoPostRdo, updatedPost.toPhotoPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
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
    // return fillDto(PhotoPostRdo, deletedPost.toPOJO());
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Post(':userId/:postId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<PhotoPostRdo> {
    const newPost = await this.blogPostService.repostPost(userId, postId);
    return fillDto(PhotoPostRdo, newPost.toPhotoPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
