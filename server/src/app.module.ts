import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { PostModule } from './post/post.module';
import { FavoriteModule } from './favorite/favorite.module';
import { LoggerMiddleware } from './@common/middlewares/logger.middleware';
import { User } from './auth/user.entity';
import { Favorite } from './favorite/favorite.entity';
import { Image } from './image/image.entity';
import { Post } from './post/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // .env 파일 경로 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Favorite, Image, Post], // 모든 엔티티 설정
        synchronize: true,
        logging: true, // 로깅 활성화
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/',
    }),
    PostModule,
    AuthModule,
    ImageModule,
    FavoriteModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
