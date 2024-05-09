import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
// import { AddNewPostDto } from './dto/add-new-post.dto';
import { CreateLinkPostDto, UpdateLinkPostDto, LinkPostRdo, LinkPostQuery, LinkPostWithPaginationRdo } from '@project/blog-post';
import { CreateCommentDto } from '@project/blog-comment';
// import { ApplicationServiceURL } from './app.constant';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ConfigService } from '@nestjs/config';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class LinkPostsController {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  @Post('link')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async create(@Body() dto: CreateLinkPostDto): Promise<LinkPostRdo> {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link`, dto);
    return data;
  }

  @Get('link/:id')
  // @UseGuards(CheckAuthGuard)
  // @UseInterceptors(InjectUserIdInterceptor)
  public async show(@Param('id') id: string): Promise<LinkPostRdo> {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link/:${id}`);
    return data;
  }

  @Get('link')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async index(@Query() query: LinkPostQuery): Promise<LinkPostWithPaginationRdo> {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link`, query);
    return data;
  }

  @Patch('link/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async update(
    @Body('userId') userId: string,
    @Param('postId') postId: string,
    @Body() dto: UpdateLinkPostDto): Promise<LinkPostRdo> {
      const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link/:${postId}`, userId, dto);
      return data;
  }

  @Delete('link/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  // @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Body('userId') userId: string, @Param('postId') postId: string): Promise<void> {
    await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link/:${postId}`, userId);
      // return data;
  }

  @Post('link/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async repost(@Body('userId') userId: string, @Param('postId') postId: string): Promise<LinkPostRdo> {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link/:${postId}`, userId);
    return data;
  }

  @Post('link/:postId/comments')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('BLOG_SERVICE_URL')}/link/:${postId}/comments`, dto);
    return data;
  }
}
