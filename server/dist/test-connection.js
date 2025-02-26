"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/auth/user.entity");
const favorite_entity_1 = require("./src/favorite/favorite.entity");
const image_entity_1 = require("./src/image/image.entity");
const post_entity_1 = require("./src/post/post.entity");
const config_1 = require("@nestjs/config");
const config_2 = require("@nestjs/config");
config_2.ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
});
const configService = new config_1.ConfigService();
async function testConnection() {
    try {
        const connection = await (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT', 5432),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [user_entity_1.User, favorite_entity_1.Favorite, image_entity_1.Image, post_entity_1.Post],
            synchronize: true,
            logging: true,
        });
        console.log('Database connection established successfully.');
        await connection.close();
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
testConnection();
//# sourceMappingURL=test-connection.js.map