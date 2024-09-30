// write out a class that lists all properties that an incoming request
// to create a spotti should have

import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BestTimeToVisit } from '../../constants/bestTimeToVisit';
import { Category } from '../../constants/category';
import { ApiProperty } from '@nestjs/swagger';
import { Tags } from '../../constants/tags';

export class CreateSpottiDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Statue of Liberty', description: 'Name of the Spotti' })
  name!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ 
    example: 'The Statue of Liberty is an iconic symbol of freedom located on Liberty Island in New York Harbor. Gifted to the United States by France in 1886, the statue depicts a robed woman representing Libertas, the Roman goddess of liberty, holding a torch in one hand and a tablet inscribed with the date of the American Declaration of Independence in the other. Standing 305 feet tall, the statue has become a symbol of hope and democracy, welcoming millions of immigrants arriving by sea to the U.S.', 
    description: 'Short paragraph describing the Spotti' 
  })
  description!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '155', description: '' })
  locationId!: string;

  @IsOptional()
  @IsEnum(Category, {message: 'Category of the Spotti, explicit options set in Category enum.'} )
  @ApiProperty({
    example: Category.Landmarks,
    description: 'Category name of the Spotti, options explicitly set in Category enum.',
    enum: Category,
  })
  category!: Category;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: '5', description: 'Rating of the spotti, must be between 1 - 5' })
  rating!: number;

  @IsOptional()
  @IsArray()
  @IsEnum(Tags, { each: true })
  @ApiProperty({
    example: [Tags.HistoricalSignificance, Tags.Romantic, Tags.Architectural],
    description: 'Tags associated with the Spotti, options explicitly set in Tags enum.',
    isArray: true,
    enum: Tags
  })
  tags!: Tags[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  reviews!: object[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['urlPathToImage1', 'urlPathToImage2'],
    description: 'Pictures of the Spotti.',
    isArray: true,
  })
  pictures!: string[];

  @IsOptional()
  @IsEnum(BestTimeToVisit, {message: 'Best time to visity Spotti, options explicitly set in Tags enum'})
  @ApiProperty({
    example: BestTimeToVisit.Evening,
    description: 'Best time to visit the Spotti, with explicit options set in BestTimeToVisit enum.',
    isArray: true,
    enum: BestTimeToVisit
  })
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
