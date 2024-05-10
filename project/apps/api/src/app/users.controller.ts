import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from '@project/authentication';

// import { ApplicationServiceURL } from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ConfigService } from '@nestjs/config';
import { UserRdo } from 'libs/account/authentication/src/rdo/user.rdo';
import { UpdateUserDto } from 'libs/account/authentication/src/dto/update-user.dto';
import { UpdateUserPasswordDto } from 'libs/account/authentication/src/dto/update-user-password.dto';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    // const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    // const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
    //   headers: {
    //     'Authorization': req.headers['authorization']
    //   }
    // });
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
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/register`, dto);
    return data;
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get<string>('USERS_SERVICE_URL')}/:${id}`);

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
  public async updateAvatar(@Body() dto: UpdateUserDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.patch(`${this.configService.get<string>('USERS_SERVICE_URL')}/update-avatar`, dto);
    return data;
  }

  @Patch('update-password')
  public async updatePassword(@Body() dto: UpdateUserPasswordDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.patch(`${this.configService.get<string>('USERS_SERVICE_URL')}/update-password`, dto);
    return data;
  }
}
