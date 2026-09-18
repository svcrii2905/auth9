// src/users/dto/create-user.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, IsOptional, MinLength, MaxLength, IsArray, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Carlos Pérez', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ description: 'Correo electrónico único', example: 'carlos@email.com', maxLength: 150 })
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @ApiProperty({ description: 'Contraseña de acceso (mínimo 6 caracteres)', example: 'SecureP@ss123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'especificacion del rol', example: 'ADMIN', maxLength: 100 })
  @IsArray({ message: 'Los roles deben ser un arreglo de IDs' })
  @IsUUID('4', { each: true, message: 'Cada ID de rol debe ser un UUID válido' })
  @IsOptional() 
  roles?: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}