import { IsEmail, MinLength, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;
}
