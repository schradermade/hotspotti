// write out a class that lists all properties that an incoming request
// to create a spotti should have

import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BestTimeToVisit } from '../../constants/bestTimeToVisit';
import { Category } from '../../constants/category';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpottiDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Statue of Liberty', description: 'Name of the Spotti' })
  name!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Statue of Liberty', description: 'The Statue of Liberty is an iconic symbol of freedom located on Liberty Island in New York Harbor. Gifted to the United States by France in 1886, the statue depicts a robed woman representing Libertas, the Roman goddess of liberty, holding a torch in one hand and a tablet inscribed with the date of the American Declaration of Independence in the other. Standing 305 feet tall, the statue has become a symbol of hope and democracy, welcoming millions of immigrants arriving by sea to the U.S.' })
  description!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '155', description: '' })
  locationId!: string;

  @IsOptional()
  @IsEnum(Category, {message: 'category must be one of the following: Landmarks, Historical, Parks, Famous Streets, Museums, Natural Wonders, Beaches, Entertainment, Shopping, Dining, Scenic Views, Religious Sites, Monuments, Night Life.'} )
  @ApiProperty({ example: 'Landmarks', description: 'Category name of the Spotti.' })
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
