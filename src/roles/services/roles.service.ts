import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';
import { CreateRolesDto, UpdateRolesDto } from '../dtos/create-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  // Consulta todos los roles (opcionalmente puedes incluir { users: true } si deseas ver los usuarios)
  async findAll(): Promise<Roles[]> {
    return await this.rolesRepository.find();
  }

  // Busca un rol por ID
  async findOne(id: string): Promise<Roles> {
    const role = await this.rolesRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return role;
  }

  async create(createRolesDto: CreateRolesDto): Promise<Roles> {
    const newRole = this.rolesRepository.create(createRolesDto);
    return await this.rolesRepository.save(newRole);
  }

  async update(id: string, updateRolesDto: UpdateRolesDto): Promise<Roles> {
    const role = await this.rolesRepository.preload({
      id,
      ...updateRolesDto,
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return await this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.rolesRepository.remove(role);
  }
}