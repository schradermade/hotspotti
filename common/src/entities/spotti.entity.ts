import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Hub } from './hub.entity';
import { forwardRef } from '@nestjs/common';

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

  @ManyToMany(() => Spotti)
  @JoinTable()
  nearbySpottis!: Spotti[];

  @ManyToMany(() => User, (user) => user.spottis)
  users!: User[];

  @ManyToMany(() => Hub, hub => hub.spottis)
  @JoinTable()
  hubs!: Hub[];
}
