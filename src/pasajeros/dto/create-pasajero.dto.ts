import { ApiProperty } from '@nestjs/swagger';

export class CreatePasajeroDto {
  @ApiProperty({ description: 'Nombre del pasajero', example: 'Alexis' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del pasajero', example: 'Sanchez' })
  apellido: string;

    @ApiProperty({ description: 'Email del pasajero', example: 'alexis.sanchez@email.com' })
    email: string;
  }