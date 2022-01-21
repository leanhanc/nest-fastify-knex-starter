import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Fastify Adapter
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// Modules
import { AppModule } from './app.module';

// Middleware
import { SecurityMiddleware } from './middleware/security.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        prettyPrint:
          process.env.NODE_ENV === 'development'
            ? {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              }
            : false,
      },
    }),
  );

  // API routes configuration
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // API documentation
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Nest - Fastify - Knex starter')
      .setDescription('A boilerplate for Nest JS with Knex on a Fastify server')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  // Middleware
  SecurityMiddleware.apply(app);

  await app.listen(process.env.PORT || 7000, '0.0.0.0');
}

bootstrap();
