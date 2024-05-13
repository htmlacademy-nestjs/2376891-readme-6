import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class InjectAuthorizationHeaderInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}
  public intercept(context: ExecutionContext, next: CallHandler) {
    const authorization = context.switchToHttp().getRequest().headers['authorization'];

    if (authorization) {
      this.httpService.axiosRef.defaults.headers.common['authorization'] = authorization;
    }

    return next.handle();
  }
}
