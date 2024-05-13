import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { UserAuthorizedException } from '../exceptions/user-authorized.exception';

@Injectable()
export class CheckNoAuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest().headers['authorization'];
    if (isNotEmpty(request)) {
      throw new UserAuthorizedException();
    }
    return !isNotEmpty(request);
  }
}
