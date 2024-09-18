import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetUserRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id!: number;
}