import { ApiProperty } from '@nestjs/swagger';

export class Reserva {
  @ApiProperty({ description: 'ID único de la reserva', example: 1 })
  id: number;

  @ApiProperty({ description: 'Código de confirmación', example: 'XYZ123' })
  codigoReserva: string;

  @ApiProperty({ description: 'Fecha de la reserva', example: '2024-03-20T10:00:00Z' })
  fechaReserva: Date;

  @ApiProperty({ description: 'Estado de la reserva', example: 'Confirmada' })
  estado: string;

  @ApiProperty({ description: 'ID del pasajero', example: 1 })
  pasajeroId: number;

  @ApiProperty({ description: 'ID del vuelo', example: 1 })
  vueloId: number;
}