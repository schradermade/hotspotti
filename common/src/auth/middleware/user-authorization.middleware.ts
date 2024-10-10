import { 
  Injectable, 
  NestMiddleware, 
  ForbiddenException, 
  Request, 
  Response, 
} from "@nestjs/common";
import { NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticated-request.interface";

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userFromToken = req.user;
    const userIdParam = Number(req.params.id);

    if (userFromToken.userId !== userIdParam) {
      throw new ForbiddenException('You are not allowed to access this profile.');
    }

    next();
  }
}