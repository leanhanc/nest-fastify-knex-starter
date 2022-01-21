import { Module, CacheModule } from '@nestjs/common';

// Modules
import { KnexModule } from 'nestjs-knex';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Components
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Configs
import { DatabaseConfig, GeneralConfig, commonKnexConfig } from './config';
import type { EnvironmentVariables } from './config';

const ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ENV}`,
      isGlobal: true,
      load: [GeneralConfig, DatabaseConfig],
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        config: {
          ...commonKnexConfig,
          connection: configService.get('db.connection', { infer: true }),
        },
      }),
    }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
