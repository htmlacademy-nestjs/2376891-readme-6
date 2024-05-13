import { ForbiddenException } from '@nestjs/common';
import { AUTHENTICATION_RESPONSE_MESSAGES } from '../authentication-module/authentication.constant';

export class UserAuthorizedException extends ForbiddenException {
  constructor() {
    super(AUTHENTICATION_RESPONSE_MESSAGES.USER_AUTHORIZED);
  }
}
