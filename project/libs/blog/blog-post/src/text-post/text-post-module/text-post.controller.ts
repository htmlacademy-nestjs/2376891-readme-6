import { Body, Controller, Post, Get, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { TextPostService } from './text-post.service';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { TextPostRdo } from '../rdo/text-post.rdo';
import { UpdateTextPostDto } from '../dto/update-text-post.dto';
import { PostResponseMessage } from '../../post.constant';

@ApiTags('text-post')
@Controller('posts/text')
export class TextPostController {
  constructor(
    private readonly textPostService: TextPostService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
  })
  @Post(':userId')
  public async create(@Param() userId: string, @Body() dto: CreateTextPostDto): Promise<TextPostRdo> {
    const newPost = await this.textPostService.createPost(dto, userId);
    return fillDto(TextPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string): Promise<TextPostRdo> {
    const foundPost = await this.textPostService.findPostById(id);
    return fillDto(TextPostRdo, foundPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
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
    @Body() dto: UpdateTextPostDto): Promise<TextPostRdo> {
    const newPost = await this.textPostService.updatePost(userId, offerId, dto);
    return fillDto(TextPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Delete(':userId/:offerId')
  public async delete(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<TextPostRdo> {
    const deletedPost = await this.textPostService.deletePost(userId, offerId);
    return fillDto(TextPostRdo, deletedPost.toPOJO());
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post(':userId/:offerId')
  public async repost(@Param('userId') userId: string, @Param('offerId') offerId: string): Promise<TextPostRdo> {
    const newPost = await this.textPostService.repostPost(userId, offerId);
    return fillDto(TextPostRdo, newPost.toPOJO());
  }
}
