import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { LinkPostService } from './link-post.service';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';
import { LinkPostRdo } from '../rdo/link-post.rdo';
import { PostResponseMessage } from '../../post.constant';

@ApiTags('link-post')
@Controller('posts/link')
export class LinkPostController {
  constructor(
    private readonly linkPostService: LinkPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
  })
  // @ApiResponse({
  //   status: HttpStatus.CONFLICT,
  //   description: PostResponseMessage.PostExist
  // })
  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateLinkPostDto): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.createPost(dto, userId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
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
  @Get(':id')
  public async show(@Param('id') id: string): Promise<LinkPostRdo> {
    const foundPost = await this.linkPostService.findPostById(id);
    return fillDto(LinkPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: LinkPostRdo,
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
    @Param('offerId') offerId: string,
    @Body() dto: UpdateLinkPostDto): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.updatePost(userId, offerId, dto);
    return fillDto(LinkPostRdo, newPost.toPOJO());
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
  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<LinkPostRdo> {
    const deletedPost = await this.linkPostService.deletePost(userId, offerId);
    return fillDto(LinkPostRdo, deletedPost.toPOJO());
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
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.repostPost(userId, offerId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }
}
