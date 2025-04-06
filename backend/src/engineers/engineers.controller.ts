import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EngineersService } from './engineers.service';
import { Engineer } from './entities/engineer.entity';

@Controller('engineers')
export class EngineersController {
  constructor(private readonly engineersService: EngineersService) {}

  @Get()
  findAll(@Query('specialty') specialty?: string) {
    if (specialty) {
      return this.engineersService.findBySpecialty(specialty);
    }
    return this.engineersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineersService.findOne(id);
  }

  @Post()
  create(@Body() engineer: Partial<Engineer>) {
    return this.engineersService.create(engineer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() engineer: Partial<Engineer>) {
    return this.engineersService.update(id, engineer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineersService.remove(id);
  }
} 