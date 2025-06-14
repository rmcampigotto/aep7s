import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { OcorrenciasService } from './ocorrencias.service';

@Controller('ocorrencias')
export class OcorrenciasController {
  constructor(private readonly ocorrenciasService: OcorrenciasService) {}

  @Post()
  create(@Body() data: any) {
    return this.ocorrenciasService.create(data);
  }

  @Get()
  findAll() {
    return this.ocorrenciasService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.ocorrenciasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ocorrenciasService.remove(id);
  }
}