// write out a class that lists all properties that an incoming request
// to create a spotti should have

import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BestTimeToVisit } from '../../constants/bestTimeToVisit';

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
  @IsEnum(BestTimeToVisit, {message: 'bestTimeToVisit must of one of: Morning, Afternoon, Evening, All Day'})
  bestTimeToVisit!: BestTimeToVisit;

  @IsOptional()
  @IsString()
  hoursofOperation!: string;

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => Spotti)
  // nearbySpottis!: Spotti[];

  // @IsOptional()
  // @IsArray()
  // users?: number[]; // Array of User IDs that have saved this Spotti
}
