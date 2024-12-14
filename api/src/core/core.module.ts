import {Module} from "@nestjs/common";
import {AuthMiddleware} from "./auth/auth.middleware";

@Module({
    providers: [AuthMiddleware],
    exports: [AuthMiddleware]
})
export class CoreModule {

}