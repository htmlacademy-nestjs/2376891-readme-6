import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { IToken, IUser } from '@project/core';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload } from '@project/helpers';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AUTHENTICATION_RESPONSE_MESSAGES, AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, password, avatarId } = dto;

    const blogUser = {
      email,
      name,
      avatar: avatarId ?? '',
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async updateUser(dto: UpdateUserDto, id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    let hasChanges = false;

    if (! existUser) {
      throw new NotFoundException(AUTHENTICATION_RESPONSE_MESSAGES.USER_NOT_FOUND);
    }

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existUser[key] !== value) {
        existUser[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existUser;
    }

    await this.blogUserRepository.update(existUser);
    return existUser;
  }

  public async updateUserPassword(dto: UpdateUserPasswordDto, email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(AUTHENTICATION_RESPONSE_MESSAGES.USER_NOT_FOUND);
    }

    if (!existUser.comparePassword(dto.password)) {
      throw new NotFoundException(AUTHENTICATION_RESPONSE_MESSAGES.LOGGED_ERROR);
    }

    const newUser = await existUser.setPassword(dto.newPassword);

    await this.blogUserRepository.update(newUser);
    return newUser;
  }

  public async createUserToken(user: IUser): Promise<IToken> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
