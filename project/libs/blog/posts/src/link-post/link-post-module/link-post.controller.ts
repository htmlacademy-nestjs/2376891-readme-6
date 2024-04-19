import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { LinkPostService } from './link-post.service';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { UpdateLinkPostDto } from '../dto/update-link-post.dto';
import { LinkPostRdo } from '../rdo/link-post.rdo';

@Controller('posts/link')
export class LinkPostController {
  constructor(
    private readonly linkPostService: LinkPostService
  ) { }

  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateLinkPostDto): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.createPost(dto, userId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<LinkPostRdo> {
    const foundPost = await this.linkPostService.findPostById(id);
    return fillDto(LinkPostRdo, foundPost.toPOJO());
  }

  @Patch(':userId/:offerId')
  public async update(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string,
    @Body() dto: UpdateLinkPostDto): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.updatePost(userId, offerId, dto);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }

  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<LinkPostRdo> {
    const deletedPost = await this.linkPostService.deletePost(userId, offerId);
    return fillDto(LinkPostRdo, deletedPost.toPOJO());
  }

  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<LinkPostRdo> {
    const newPost = await this.linkPostService.repostPost(userId, offerId);
    return fillDto(LinkPostRdo, newPost.toPOJO());
  }
}
