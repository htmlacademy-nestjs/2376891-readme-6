import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/helpers';
import { NotifyService } from '@project/account-notify';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTHENTICATION_RESPONSE_MESSAGES } from './authentication.constant';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IRequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IRequestWithTokenPayload } from './request-with-token-payload.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_EXIST,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AUTHENTICATION_RESPONSE_MESSAGES.LOGGED_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTHENTICATION_RESPONSE_MESSAGES.LOGGED_ERROR,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() {user}: IRequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_NOT_FOUND,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
    // return existUser.toPOJO();
  }

  @Patch('update-avatar')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_AVATAR,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTHENTICATION_RESPONSE_MESSAGES.UNAUTHORIZED,
  })
  public updateAvatar(
    // @Body() dto: UpdateUserAvatarDto,
    @Body() dto: UpdateUserDto,
    @Req() { user }: IRequestWithUser
  ) {
    // return this.authService.updateUser(user.id, { avatarId: dto.avatarId });
    return this.authService.updateUser(user.id, dto);
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_PASSWORD,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AUTHENTICATION_RESPONSE_MESSAGES.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTHENTICATION_RESPONSE_MESSAGES.UNAUTHORIZED,
  })
  public updatePassword(
    @Body() dto: UpdateUserPasswordDto,
    @Req() { user }: IRequestWithUser
  ) {
    return this.authService.updateUserPassword(user.id, dto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: IRequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload;
  }
}
