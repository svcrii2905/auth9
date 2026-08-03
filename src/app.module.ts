import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[(process.env.NODE_ENV as keyof typeof enviroments) ?? 'dev'] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('dev', 'stg', 'prod').default('dev'),
        
        // Permite la URL completa de Neon / Render
        DATABASE_URL: Joi.string().optional(),
        
        // Pasan de ser .required() a opcionales para que no rompa en Render
        POSTGRES_DB: Joi.string().optional(),
        POSTGRES_USER: Joi.string().optional(),
        POSTGRES_PASSWORD: Joi.string().optional(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_HOST: Joi.string().optional(),
        
        JWT_SECRET: Joi.string().optional(),
        JWT_EXPIRES_IN: Joi.number().optional(),
        CORS_ORIGINS: Joi.string().optional(),
      }).or('DATABASE_URL', 'POSTGRES_HOST'), // Exige que al menos exista DATABASE_URL o POSTGRES_HOST
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}