import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,  } from "typeorm";
import { Spotti } from "./spotti.entity";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Hub {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the Hub' })
  id!: number;

  @Column()
  @ApiProperty({ example: 'NW 23rd Avenue', description: 'The name of the Hub' })
  name!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    example: '45.5231,-122.6765',
    description: 'Geospatial boundaries for highlighting the Hub area on the map',
  })
  boundaries!: string; // Geospatial boundaries for highlighting the Hub area on the map

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'A popular shopping district with restaurants and cafes',
    description: 'Optional description of the Hub',
    required: false,
  })
  description?: string;

  @ManyToMany(() => Spotti, spotti => spotti.hubs)
  spottis!: Spotti[];
  
  @ManyToMany(() => User, user => user.hubs)
  @JoinTable()
  users!: User[];
}