import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configType: ConfigType<typeof config>) => {
        const { url, user, host, name, password, port } = configType.dataBase;

        // Si existe DATABASE_URL (Neon / Render)
        if (url) {
          return {
            type: 'postgres',
            url,
            synchronize: false,
            autoLoadEntities: true,
            ssl: {
              rejectUnauthorized: false, // Obligatorio para la conexión SSL de Neon
            },
          };
        }

        // Si se usan variables independientes (Postgres local / Docker)
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}