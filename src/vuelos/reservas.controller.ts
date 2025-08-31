import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@ApiTags('Reservas')
@Controller('vuelos/:vueloId/reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente', type: Reserva })
  @ApiResponse({ status: 404, description: 'Vuelo o pasajero no encontrado' })
  @ApiParam({ name: 'vueloId', type: Number, description: 'ID del vuelo' })
  create(@Param('vueloId') vueloId: string, @Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(+vueloId, createReservaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiQuery({ name: 'pasajeroId', required: false, description: 'ID del pasajero para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de reservas', type: [Reserva] })
  @ApiParam({ name: 'vueloId', type: Number, description: 'ID del vuelo' })
  findAll(@Param('vueloId') vueloId: string, @Query('pasajeroId') pasajeroId?: string) {
    return this.reservasService.findAll(+vueloId, pasajeroId ? +pasajeroId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  @ApiParam({ name: 'vueloId', type: Number, description: 'ID del vuelo' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la reserva' })
  findOne(@Param('vueloId') vueloId: string, @Param('id') id: string) {
    return this.reservasService.findOne(+vueloId, +id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar el estado de una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva actualizada', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  @ApiParam({ name: 'vueloId', type: Number, description: 'ID del vuelo' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la reserva' })
  update(@Param('vueloId') vueloId: string, @Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(+vueloId, +id, updateReservaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva eliminada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  @ApiParam({ name: 'vueloId', type: Number, description: 'ID del vuelo' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la reserva' })
  remove(@Param('vueloId') vueloId: string, @Param('id') id: string) {
    return this.reservasService.remove(+vueloId, +id);
  }
}