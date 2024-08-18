import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Spotti {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  locationId: string;

  @Column()
  category: string;

  @Column()
  rating: number;

  @Column()
  tags: string[];

  @Column()
  reviews: object[];

  @Column()
  pictures: string[];

  @Column()
  bestTimeToVisit: string;

  @Column()
  hoursofOperation: string;

  @Column()
  nearbySpottis: Spotti[];
}
