import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'fastify-rate-limit';

export class SecurityMiddleware {
  static apply(app: NestFastifyApplication) {
    app.enableCors({
      origin: process.env.CLIENT_URL || '*',
      credentials: true,
    });

    app.register(rateLimit as any, {
      max: 100,
      timeWindow: '1 minute',
      addHeaders: {
        'x-ratelimit-limit': false,
        'x-ratelimit-remaining': false,
        'x-ratelimit-reset': false,
        'retry-after': false,
      },
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  }
}
