"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const image_module_1 = require("./image/image.module");
const post_module_1 = require("./post/post.module");
const favorite_module_1 = require("./favorite/favorite.module");
const logger_middleware_1 = require("./@common/middlewares/logger.middleware");
const user_entity_1 = require("./auth/user.entity");
const favorite_entity_1 = require("./favorite/favorite.entity");
const image_entity_1 = require("./image/image.entity");
const post_entity_1 = require("./post/post.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [user_entity_1.User, favorite_entity_1.Favorite, image_entity_1.Image, post_entity_1.Post],
                    synchronize: true,
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/',
            }),
            post_module_1.PostModule,
            auth_module_1.AuthModule,
            image_module_1.ImageModule,
            favorite_module_1.FavoriteModule,
        ],
        providers: [config_1.ConfigService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map