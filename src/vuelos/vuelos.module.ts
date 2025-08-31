import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { AeropuertosModule } from '../aeropuertos/aeropuertos.module';
import { PasajerosModule } from '../pasajeros/pasajeros.module';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  imports: [AeropuertosModule, PasajerosModule],
  controllers: [VuelosController, ReservasController],
  providers: [VuelosService, ReservasService],
})
export class VuelosModule {}
