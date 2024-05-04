import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete, Query, HttpCode, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';
import { CommentRdo, CreateCommentDto } from '@project/blog-comment';

import { BlogPostService } from '../blog-post.service';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';
import { LinkPostRdo } from '../rdo/link-post.rdo';
import { BlogPostQuery } from '../blog-post.query';
import { LinkPostWithPaginationRdo } from '../rdo/link-post-with-pagination.rdo';
import { BlogPostResponseMessage } from '../blog-post.constant';

@ApiTags('posts')
@Controller('posts/link')
export class LinkPostController {
  constructor( private readonly blogPostService: BlogPostService ) { }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LinkPostRdo,
    description: BlogPostResponseMessage.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async create(@Body(new ValidationPipe()) dto: CreateLinkPostDto, @Param() userId: string): Promise<LinkPostRdo> {
    const newPost = await this.blogPostService.createPost(dto, userId);
    return fillDto(LinkPostRdo, newPost.toLinkPOJO());
  }

  @Get(':id')
  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<LinkPostRdo> {
    const foundPost = await this.blogPostService.findPostById(id);
    return fillDto(LinkPostRdo, foundPost.toLinkPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery): Promise<LinkPostWithPaginationRdo> {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toLinkPOJO()),
    }
    return fillDto(LinkPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: LinkPostRdo,
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
    @Body(new ValidationPipe()) dto: UpdateLinkPostDto): Promise<LinkPostRdo> {
    const updatedPost = await this.blogPostService.updatePost(userId, postId, dto);
    return fillDto(LinkPostRdo, updatedPost.toLinkPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
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
    // return fillDto(LinkPostRdo, deletedPost.toLinkPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessage.PostNotFound,
  })
  @Post(':userId/:postId')
  public async repost(@Param('userId') userId: string, @Param('postId', ParseUUIDPipe) postId: string): Promise<LinkPostRdo> {
    const newPost = await this.blogPostService.repostPost(userId, postId);
    return fillDto(LinkPostRdo, newPost.toLinkPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body(new ValidationPipe()) dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
