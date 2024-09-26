import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email!: string;

  @IsString()
  @ApiProperty({ example: 'password123', description: 'User password' })
  password!: string;

  @IsString()
  @ApiProperty({ example: 'Joe', description: 'Users first name' })
  firstName!: string;

  @IsString()
  @ApiProperty({ example: 'Miller', description: 'Users last name' })
  lastName!: string;
}
