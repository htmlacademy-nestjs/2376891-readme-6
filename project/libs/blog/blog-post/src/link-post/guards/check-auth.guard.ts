import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get<string>('USERS_SERVICE_URL')}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
