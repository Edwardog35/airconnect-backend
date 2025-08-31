import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  private aeropuertos: Aeropuerto[] = [];
  private idCounter = 1;

  create(createAeropuertoDto: CreateAeropuertoDto): Aeropuerto {
    // Validar si ya existe un aeropuerto con el mismo código
    const existingAeropuerto = this.aeropuertos.find(
      (a) => a.codigo === createAeropuertoDto.codigo,
    );
    
    if (existingAeropuerto) {
      throw new ConflictException(
        `Ya existe un aeropuerto con el código ${createAeropuertoDto.codigo}`,
      );
    }

    // Crear nuevo aeropuerto
    const aeropuerto: Aeropuerto = {
      id: this.idCounter++,
      ...createAeropuertoDto,
    };
    
    this.aeropuertos.push(aeropuerto);
    return aeropuerto;
  }

  findAll(): Aeropuerto[] {
    return this.aeropuertos;
  }

  findOne(id: number): Aeropuerto {
    const aeropuerto = this.aeropuertos.find((a) => a.id === id);
    
    if (!aeropuerto) {
      throw new NotFoundException(`Aeropuerto con ID ${id} no encontrado`);
    }
    
    return aeropuerto;
  }

  update(id: number, updateAeropuertoDto: UpdateAeropuertoDto): Aeropuerto {
    const aeropuerto = this.findOne(id);
    
    // Validar código único si se está actualizando el código
    if (updateAeropuertoDto.codigo && updateAeropuertoDto.codigo !== aeropuerto.codigo) {
      const existing = this.aeropuertos.find(a => a.codigo === updateAeropuertoDto.codigo && a.id !== id);
      if (existing) {
        throw new ConflictException(`Ya existe un aeropuerto con el código ${updateAeropuertoDto.codigo}`);
      }
      aeropuerto.codigo = updateAeropuertoDto.codigo;
    }

    if (updateAeropuertoDto.nombre) {
      aeropuerto.nombre = updateAeropuertoDto.nombre;
    }

    if (updateAeropuertoDto.ciudad) {
      aeropuerto.ciudad = updateAeropuertoDto.ciudad;
    }

    return aeropuerto;
  }

  remove(id: number): { message: string } {
    const index = this.aeropuertos.findIndex((a) => a.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Aeropuerto con ID ${id} no encontrado`);
    }
    
    this.aeropuertos.splice(index, 1);
    return { message: 'Aeropuerto eliminado exitosamente' };
  }
}