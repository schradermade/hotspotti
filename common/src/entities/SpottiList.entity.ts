import { Entity, Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Spotti } from "./spotti.entity";

@Entity()
export class SpottiList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.spottiLists, { onDelete: 'CASCADE', cascade: true })
  user!: User;

  @ManyToMany(() => Spotti, (spotti) => spotti.spottiLists, { cascade: true })
  @JoinTable()
  spottis!: Spotti[];
}