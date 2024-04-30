import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { PhotoPostService } from './photo-post.service';
import { PhotoPostRdo } from '../rdo/photo-post.rdo';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { UpdatePhotoPostDto } from '../dto/update-photo-post.dto';
import { PostResponseMessage } from '../../post.constant';

@ApiTags('photo-post')
@Controller('posts/photo')
export class PhotoPostController {
  constructor(
    private readonly photoPostService: PhotoPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
  })
  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreatePhotoPostDto): Promise<PhotoPostRdo> {
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
  public async show(@Param('id') id: string): Promise<PhotoPostRdo> {
    const foundPost = await this.photoPostService.findPostById(id);
    return fillDto(PhotoPostRdo, foundPost.toPOJO());
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
    @Param('offerId') offerId: string,
    @Body() dto: UpdatePhotoPostDto): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.updatePost(userId, offerId, dto);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
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
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<PhotoPostRdo> {
    const deletedPost = await this.photoPostService.deletePost(userId, offerId);
    return fillDto(PhotoPostRdo, deletedPost.toPOJO());
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
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<PhotoPostRdo> {
    const newPost = await this.photoPostService.repostPost(userId, offerId);
    return fillDto(PhotoPostRdo, newPost.toPOJO());
  }
}
