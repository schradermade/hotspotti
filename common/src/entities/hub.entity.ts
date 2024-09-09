import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,  } from "typeorm";
import { Spotti } from "./spotti.entity";
import { User } from "./user.entity";

@Entity()
export class Hub {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  boundaries!: string; // Geospatial boundaries for highlighting the Hub area on the map

  @Column({ type: 'text', nullable: true })
  description?: string; // Optional description of the Hub

  // added after issue fixed
  @ManyToMany(() => Spotti, spotti => spotti.hubs)
  spottis!: Spotti[];
  
  // added after issue fixed
  @ManyToMany(() => User, user => user.hubs)
  @JoinTable()
  users!: User[];
}