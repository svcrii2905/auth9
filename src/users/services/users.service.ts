import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // 1. Cargamos las relaciones explícitamente para incluir los roles
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                roles: true, // Habilita la carga de la relación 'roles'
            },
        });
    }

    // Busca un usuario por ID cargando sus roles
    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                roles: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        return user;
    }

    // 2. Mapeamos los IDs de roles a objetos de entidad antes de guardar
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { roles, ...userData } = createUserDto;

        const newUser = this.userRepository.create({
            ...userData,
            // Convertimos el arreglo de IDs ['uuid1', 'uuid2'] a objetos [{ id: 'uuid1' }, { id: 'uuid2' }]
            roles: roles?.map((id) => ({ id } as Roles)),
        });

        return await this.userRepository.save(newUser);
    }

    // 3. Manejamos la actualización mapeando los roles si vienen en el DTO
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { roles, ...userData } = updateUserDto;

        // Buscamos el usuario existente
        const user = await this.findOne(id);

        // Fusionamos los datos simples
        this.userRepository.merge(user, userData);

        // Si se enviaron roles en la petición, actualizamos la relación
        if (roles) {
            user.roles = roles.map((roleId) => ({ id: roleId } as Roles));
        }

        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}