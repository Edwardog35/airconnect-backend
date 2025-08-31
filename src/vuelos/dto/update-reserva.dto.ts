import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservaDto {
  @ApiProperty({ description: 'Estado de la reserva', example: 'Cancelada', required: false })
  estado?: string;
}
