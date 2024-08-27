import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Spotti } from '../entities/spotti.entity';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
