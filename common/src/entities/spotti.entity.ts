import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Hub } from './hub.entity';

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
  category!: string;

  @Column()
  rating!: number;

  @Column({ type: 'simple-json', nullable: true })
  tags!: string[];

  @Column({ type: 'simple-json', nullable: true })
  reviews!: object[];

  @Column({ type: 'simple-json', nullable: true })
  pictures!: string[];

  @Column()
  bestTimeToVisit!: string;

  @Column({ nullable: true })
  hoursofOperation!: string;

  @Column({ type: 'simple-json', nullable: true })
  nearbySpottis!: Spotti[];

  @ManyToMany(() => User, (user) => user.spottis)
  users!: User[];

  @ManyToMany(() => Hub, (hub) => hub.spottis)
  hubs!: Hub[];
}
