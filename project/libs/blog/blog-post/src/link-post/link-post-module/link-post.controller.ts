import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { LinkPostService } from './link-post.service';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';
import { LinkPostRdo } from '../rdo/link-post.rdo';
import { PostResponseMessage } from '../../post.constant';
import { LinkPostWithPaginationRdo } from '../rdo/link-post-with-pagination.rdo';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';
import { LinkPostQuery } from './link-post.query';

@ApiTags('link-post')
@Controller('posts/link')
export class LinkPostController {
  constructor(
    private readonly linkPostService: LinkPostService
  ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LinkPostRdo,
    description: PostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(
    @Body(new ValidationPipe()) dto: CreateLinkPostDto,
    @Param('userId') userId: string
  ): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.createPost(dto, userId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  public async show(@Param('id') id: string): Promise<LinkPostRdo> {
    const foundPost = await this.linkPostService.findPostById(id);
    return fillDto(LinkPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: LinkPostQuery): Promise<LinkPostWithPaginationRdo> {
    const postsWithPagination = await this.linkPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(LinkPostWithPaginationRdo, result);
  }

  @Patch(':postId')
  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  public async update(
    @Query('userId') userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body(new ValidationPipe()) dto: UpdateLinkPostDto): Promise<LinkPostRdo> {
    const updatedPost = await this.linkPostService.updatePost(userId, postId, {...dto, userId});
    return fillDto(LinkPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Body('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<void> {
    await this.linkPostService.deletePost(userId, postId);
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':postId')
  public async repost(@Body('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.repostPost(userId, postId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Post(':postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.linkPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
