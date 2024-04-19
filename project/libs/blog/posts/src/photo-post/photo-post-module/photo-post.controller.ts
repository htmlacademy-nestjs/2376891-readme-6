import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PhotoPostService } from './photo-post.service';
import { PhotoPostRdo } from '../rdo/photo-post.rdo';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';

@Controller('posts/photo')
export class PhotoPostController {
  constructor(
    private readonly photoPostService: PhotoPostService
  ) { }

  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreatePhotoPostDto): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.createPost(dto, userId);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<PhotoPostRdo> {
    const foundPost = await this.photoPostService.findPostById(id);
    return fillDto(PhotoPostRdo, foundPost.toPOJO());
  }

  @Patch(':userId/:offerId')
  public async update(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string,
    @Body() dto: UpdatePhotoPostDto): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.updatePost(userId, offerId, dto);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }

  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<PhotoPostRdo> {
    const deletedPost = await this.photoPostService.deletePost(userId, offerId);
    return fillDto(PhotoPostRdo, deletedPost.toPOJO());
  }

  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.repostPost(userId, offerId);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }
}
