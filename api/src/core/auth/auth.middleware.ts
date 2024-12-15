import {ForbiddenException, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (!req['auth']?.userId) {
            return next(new ForbiddenException())
        }
        next();
    }
}