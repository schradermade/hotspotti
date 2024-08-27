// write out a class that lists all properties that an incoming request
// to create a spotti should have

import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Spotti } from '../entities/spotti.entity';
import { Type } from 'class-transformer';

export class CreateSpottiDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  locationId!: string;

  @IsOptional()
  @IsString()
  category!: string;

  @IsOptional()
  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  reviews!: object[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pictures!: string[];

  @IsOptional()
  @IsString()
  bestTimeToVisit!: string;

  @IsOptional()
  @IsString()
  hoursofOperation!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Spotti)
  nearbySpottis!: Spotti[];

  @IsOptional()
  @IsArray()
  users?: number[]; // Array of User IDs that have saved this Spotti
}
