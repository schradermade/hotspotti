import { IsOptional, IsString } from "class-validator";

export class CreateHubDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  boundaries!: string;

  @IsOptional()
  @IsString()
  description!: string;
}