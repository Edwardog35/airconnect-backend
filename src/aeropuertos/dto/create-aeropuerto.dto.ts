import { ApiProperty } from '@nestjs/swagger';

// para crear nuevo aeropuertto , requiere nombre, codigo del pais y ciudad
export class CreateAeropuertoDto {
  @ApiProperty({ description: 'Nombre completo del aeropuerto', example: 'Aeropuerto Internacional Arturo Merino Benitez' })
  nombre: string;

  @ApiProperty({ description: 'Codigo IATA de tres letras', example: 'SCL' })
  codigo: string;

  @ApiProperty({ description: 'Ciudad donde se encuentra el aeropuerto', example: 'Santiago' })
  ciudad: string;
}