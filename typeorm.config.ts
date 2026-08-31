// typeorm.config.ts
import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import globalConfig from './src/config'; // Ajusta la ruta a tu archivo config.ts si es diferente

dotenvConfig(); // Carga las variables del archivo .env

const dbConfig = globalConfig().dataBase;

export default new DataSource(
  dbConfig.url
    ? {
        type: 'postgres',
        url: dbConfig.url,
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['src/migrations/*{.ts,.js}'],
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.name,
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['src/migrations/*{.ts,.js}'],
      },
);