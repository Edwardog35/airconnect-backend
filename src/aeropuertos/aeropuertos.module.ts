import { Module } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { AeropuertosController } from './aeropuertos.controller';

@Module({
  controllers: [AeropuertosController],
  providers: [AeropuertosService],
  exports: [AeropuertosService], // Importante para que otros módulos lo usen
})
export class AeropuertosModule {}