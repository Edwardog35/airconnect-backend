import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID del pasajero', example: 1 })
  pasajeroId: number;
}
