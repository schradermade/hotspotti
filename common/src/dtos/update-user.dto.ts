import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Spotti } from "../entities/spotti.entity";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  locationId!: string;

  @IsString()
  @IsOptional()
  category!: string;

  @IsNumber()
  @IsOptional()
  rating!: number;

  @IsArray()
  @IsString({ each: true })  // Ensures each element in the array is a string
  @IsOptional()
  tags!: string[];

  @IsArray()
  @IsOptional()
  reviews!: object[];

  @IsArray()
  @IsString({ each: true })  // Ensures each element in the array is a string
  @IsOptional()
  pictures!: string[];

  @IsString()
  @IsOptional()
  bestTimeToVisit!: string;

  @IsString()
  @IsOptional()
  hoursofOperation!: string;

  @IsArray()
  @ValidateNested({ each: true })  // Ensures nested validation for Spotti entities
  @IsOptional()
  nearbySpottis!: Spotti[];

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true }) // Ensures that each element in the array is a number
  // spottis?: number[]; // Array of Spotti IDs that the user saves
}