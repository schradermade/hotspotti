import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  refreshToken!: string;

  @Column({ type: 'datetime', nullable: true })
  lastLogin!: Date;
}
