import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { VuelosService } from './vuelos.service';
import { PasajerosService } from '../pasajeros/pasajeros.service';

@Injectable()
export class ReservasService {
  private reservas: Reserva[] = [];
  private idCounter = 1;

  constructor(
    private readonly vuelosService: VuelosService,
    private readonly pasajerosService: PasajerosService,
  ) {}

  async create(vueloId: number, createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Validar que el vuelo existe
    const vuelo = this.vuelosService.findOne(vueloId);
    
    // Validar que el pasajero existe
    const pasajero = this.pasajerosService.findOne(createReservaDto.pasajeroId);

    const reserva: Reserva = {
      id: this.idCounter++,
      ...createReservaDto,
      vueloId: vueloId,
      fechaReserva: new Date(),
      estado: 'Confirmada',
      codigoReserva: this.generateReservaCode(),
    };
    
    this.reservas.push(reserva);
    return reserva;
  }

  findAll(vueloId: number, pasajeroId?: number): Reserva[] {
    let filteredReservas = this.reservas.filter(r => r.vueloId === vueloId);

    if (pasajeroId) {
      filteredReservas = filteredReservas.filter(r => r.pasajeroId === pasajeroId);
    }

    return filteredReservas;
  }

  findOne(vueloId: number, id: number): Reserva {
    const reserva = this.reservas.find(r => r.vueloId === vueloId && r.id === id);
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada para el vuelo ${vueloId}`);
    }
    return reserva;
  }

  update(vueloId: number, id: number, updateReservaDto: UpdateReservaDto): Reserva {
    const reserva = this.findOne(vueloId, id);
    
    // Solo permitir modificar el estado
    if (updateReservaDto.estado) {
      reserva.estado = updateReservaDto.estado;
    }

    return reserva;
  }

  remove(vueloId: number, id: number): { message: string } {
    const index = this.reservas.findIndex(r => r.vueloId === vueloId && r.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada para el vuelo ${vueloId}`);
    }
    
    this.reservas.splice(index, 1);
    return { message: 'Reserva eliminada exitosamente' };
  }

  private generateReservaCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
