import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { VideoPostRdo } from '../rdo/video-post.rdo';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';
import { PostResponseMessage } from '../../post.constant';

@ApiTags('video-post')
@Controller('posts/video')
export class VideoPostController {
  constructor(
    private readonly videoPostService: VideoPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
  })
  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateVideoPostDto): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.createPost(dto, userId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
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
  @Get(':id')
  public async show(@Param('id') id: string): Promise<VideoPostRdo> {
    const foundPost = await this.videoPostService.findPostById(id);
    return fillDto(VideoPostRdo, foundPost.toPOJO());
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
    @Param('offerId') offerId: string,
    @Body() dto: UpdateVideoPostDto): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.updatePost(userId, offerId, dto);
    return fillDto(VideoPostRdo, newPost.toPOJO());
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
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<VideoPostRdo> {
    const deletedPost = await this.videoPostService.deletePost(userId, offerId);
    return fillDto(VideoPostRdo, deletedPost.toPOJO());
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
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.repostPost(userId, offerId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
  }
}
