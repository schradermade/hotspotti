import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthenticatedRequest } from './authenticated-request';

@Injectable()
export class UserAuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Authentication token is missing or invalid');
    }

    const userIdParam = Number(request.params.id);

    if (user.userId !== userIdParam) {
      throw new ForbiddenException('You are not allowed to access this profile');
    }

    return true;  // Allow access if the user is authorized
  }
}
