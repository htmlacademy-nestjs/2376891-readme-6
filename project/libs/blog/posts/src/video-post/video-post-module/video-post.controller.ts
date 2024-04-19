import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { VideoPostRdo } from '../rdo/video-post.rdo';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { UpdateVideoPostDto } from '../dto/update-video-post.dto';

@Controller('posts/video')
export class VideoPostController {
  constructor(
    private readonly videoPostService: VideoPostService
  ) { }

  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateVideoPostDto): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.createPost(dto, userId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<VideoPostRdo> {
    const foundPost = await this.videoPostService.findPostById(id);
    return fillDto(VideoPostRdo, foundPost.toPOJO());
  }

  @Patch(':userId/:offerId')
  public async update(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string,
    @Body() dto: UpdateVideoPostDto): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.updatePost(userId, offerId, dto);
    return fillDto(VideoPostRdo, newPost.toPOJO());
  }

  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<VideoPostRdo> {
    const deletedPost = await this.videoPostService.deletePost(userId, offerId);
    return fillDto(VideoPostRdo, deletedPost.toPOJO());
  }

  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<VideoPostRdo> {
    const newPost = await this.videoPostService.repostPost(userId, offerId);
    return fillDto(VideoPostRdo, newPost.toPOJO());
  }
}
