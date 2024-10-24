import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Spotti } from './spotti.entity';
import { Hub } from './hub.entity';
// import { SpottiList } from './spottiList.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  hashedPassword!: string;

  @Column()
  salt!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  lat!: number;

  @Column({ nullable: true })
  lng!: number;

  @ManyToMany(() => Spotti, (spotti) => spotti.users, { cascade: true })
  @JoinTable()
  spottis!: Spotti[];

  @ManyToMany(() => Hub, (hub) => hub.users)
  hubs!: Hub[];

  // @OneToMany(() => SpottiList, (spottiList) => spottiList.user, { cascade: true })
  // spottiLists!: SpottiList[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
