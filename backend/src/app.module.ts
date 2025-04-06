import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineersModule } from './engineers/engineers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EngineersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
