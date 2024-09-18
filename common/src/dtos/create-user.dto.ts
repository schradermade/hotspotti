import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Spotti } from '../entities/spotti.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email!: string;

  @IsString()
  @ApiProperty({ example: 'password123', description: 'User password' })
  password!: string;
}
