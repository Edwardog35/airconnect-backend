import { ApiProperty } from '@nestjs/swagger';

export class Aeropuerto {
  @ApiProperty({ description: 'ID único del aeropuerto', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre completo del aeropuerto', example: 'Aeropuerto Internacional Arturo Merino Benítez' })
  nombre: string;

  @ApiProperty({ description: 'Código IATA de tres letras', example: 'SCL' })
  codigo: string;

  @ApiProperty({ description: 'Ciudad donde se encuentra el aeropuerto', example: 'Santiago' })
  ciudad: string;
}
