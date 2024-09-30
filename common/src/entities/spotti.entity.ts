import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Hub } from './hub.entity';
import { Category } from '../constants/category';
import { Tag } from '../constants/tag';
import { BestTimeToVisit } from '../constants/bestTimeToVisit';

@Entity()
export class Spotti {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  locationId!: string;

  @Column()
  category!: Category;

  @Column()
  rating!: number;

  @Column({ type: 'simple-json', nullable: true })
  tags!: Tag[];

  @Column({ type: 'simple-json', nullable: true })
  reviews!: object[];

  @Column({ type: 'simple-json', nullable: true })
  pictures!: string[];

  @Column()
  bestTimeToVisit!: BestTimeToVisit;

  @Column({ nullable: true })
  hoursofOperation!: string;

  @ManyToMany(() => Spotti)
  @JoinTable()
  nearbySpottis!: Spotti[];

  @ManyToMany(() => User, (user) => user.spottis)
  users!: User[];

  @ManyToMany(() => Hub, hub => hub.spottis)
  @JoinTable()
  hubs!: Hub[];
}
