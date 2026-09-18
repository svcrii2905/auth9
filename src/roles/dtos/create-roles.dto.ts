import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, IsOptional, MinLength, MaxLength, IsArray, IsUUID } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({ description: 'Nombre completo del rol', example: 'Carlos Pérez', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ description: 'Descripcion de rol', example: 'Carlos Pérez', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  description!: string;
}

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}