import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetUserRequestDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id!: number;
}