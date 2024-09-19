import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHubDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  boundaries!: string;

  @IsOptional()
  @IsString()
  description!: string;
}