import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateRolesDto, UpdateRolesDto } from '../dtos/create-roles.dto';

@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener la lista de todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida correctamente.' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'El usuario ha sido creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
    create(@Body() createUserDto: CreateRolesDto) {
        return this.rolesService.create(createUserDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario existente por su ID (UUID)' })
    @ApiParam({ name: 'id', description: 'UUID del usuario a actualizar', type: 'string' })
    @ApiResponse({ status: 200, description: 'El usuario ha sido actualizado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateRolesDto: UpdateRolesDto
    ) {
        return this.rolesService.update(id, updateRolesDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por su ID (UUID)' })
    @ApiParam({ name: 'id', description: 'UUID del usuario a eliminar', type: 'string' })
    @ApiResponse({ status: 200, description: 'El usuario ha sido eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.rolesService.remove(id);
    }

}
