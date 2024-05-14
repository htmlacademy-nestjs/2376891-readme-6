import 'multer';
import { Express } from 'express';
import { HttpService } from '@nestjs/axios';
import { Body, ConflictException, Controller, FileTypeValidator, Get, MaxFileSizeValidator,
  Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';

import { CreateUserDto, LoginUserDto, UpdateUserAvatarDto} from '@project/authentication';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ConfigService } from '@nestjs/config';
import { UserRdo } from 'libs/account/authentication/src/rdo/user.rdo';
import { UpdateUserPasswordDto } from 'libs/account/authentication/src/dto/update-user-password.dto';
import { CheckNoAuthGuard } from 'libs/account/authentication/src/guards/check-no-auth.guard';
import { InjectAuthorizationHeaderInterceptor } from '@project/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { ALLOWED_FILE_TYPES, MAX_AVATAR_SIZE } from './app.constant';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post('check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/check`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post('register')
  @UseGuards(CheckNoAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_AVATAR_SIZE,
      },
    }),
  )
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: MAX_AVATAR_SIZE}),
          new FileTypeValidator({fileType: ALLOWED_FILE_TYPES}),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ): Promise<UserRdo> {
    try {
      const fileData = await this.httpService.axiosRef.post(`${this.configService.get<string>('FILE_VAULT_SERVICE_URL')}/upload`, file);

      const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/register`, dto, fileData.data);
      return data;
    } catch (e) {
      throw new ConflictException(e.response.data.message);
    }
  }

  @Get(':id')
  @UseInterceptors(InjectAuthorizationHeaderInterceptor)
  public async show(@Param('id') id: string): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get<string>('USERS_SERVICE_URL')}/${id}`);

    if (data.avatarId) {
      const { avatarId, ...restUserDto } = data;
      const avatarUrl = await this.httpService.axiosRef.get(`${this.configService.get<string>('FILE_VAULT_SERVICE_URL')}/:${avatarId}`);
      return {
        ...restUserDto,
        avatarUrl: avatarUrl.data.path,
      };
    }
    return data;
  }

  @Patch('update-avatar')
  @UseInterceptors(InjectAuthorizationHeaderInterceptor)
  public async updateAvatar(@Body() dto: UpdateUserAvatarDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.patch(`${this.configService.get<string>('USERS_SERVICE_URL')}/update-avatar`, dto);
    return data;
  }

  @Patch('update-password')
  @UseInterceptors(InjectAuthorizationHeaderInterceptor)
  public async updatePassword(
    @Body() dto: UpdateUserPasswordDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.patch(`${this.configService.get<string>('USERS_SERVICE_URL')}/update-password`, dto);
    return data;
  }
}
