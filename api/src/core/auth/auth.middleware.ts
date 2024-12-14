import {Injectable, NestMiddleware} from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: any, res: any, next: (error?: Error | any) => void) {
        throw new Error("Method not implemented.");
    }
}