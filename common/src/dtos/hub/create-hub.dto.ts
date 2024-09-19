import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHubDto {
  @ApiProperty({
    example: 'NW 23rd Avenue', // Example value for Swagger UI
    description: 'The name of the hub or street', // Property description,
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Quaint old street with shopping and restaurants', // Example value for Swagger UI
    description: 'A description of the hub, providing details about its features', // Property description
    required: false, // Marks this as optional in Swagger UI
  })
  @IsOptional()
  @IsString()
  description!: string;

  @ApiProperty({
    example: '45.5231,-122.6765', // Example boundary coordinates
    description: 'Geographical boundaries of the hub', // Property description
    required: false, // Optional property
  })
  @IsOptional()
  @IsString()
  boundaries!: string;
}