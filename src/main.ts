import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // O usa true para permitir cualquier origen en desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de la documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('API de mi Proyecto') // Título de tu API
    .setDescription('Documentación de la API del sistema backend') // Descripción
    .setVersion('1.0') // Versión actual
    .addTag('usuarios') // Etiquetas para agrupar endpoints (opcional)
    .addBearerAuth() // Útil si usas autenticación JWT
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // Ruta donde estará disponible la interfaz visual (ej. http://localhost:3000/api)
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();