import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

 @ApiTags('aeropuertos')
 @Controller('aeropuertos')
 export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

 @Post()
 @ApiOperation({ summary: 'Registrar un nuevo aeropuerto' })
 @ApiResponse({ status: 201, description: 'Aeropuerto creado correctamente.' })
 @Post()
 create(@Body() createAeropuertoDto: CreateAeropuertoDto) {
  return this.aeropuertosService.create(createAeropuertoDto);
}



  @Get()
  @ApiOperation({ summary: 'Listar aeropuertos' })
  findAll() {
    return this.aeropuertosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aeropuerto por id' })
  findOne(@Param('id') id: string) {
    return this.aeropuertosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un aeropuerto' })
  update(@Param('id') id: string, @Body() dto: UpdateAeropuertoDto) {
    return this.aeropuertosService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un aeropuerto' })
  remove(@Param('id') id: string) {
    this.aeropuertosService.remove(+id);
    return { message: `Aeropuerto id ${id} eliminado` };
  }
}
