import { Module } from '@nestjs/common';
import { EngineersService } from './engineers.service';
import { EngineersController } from './engineers.controller';

@Module({
  controllers: [EngineersController],
  providers: [EngineersService],
  exports: [EngineersService],
})
export class EngineersModule {} 