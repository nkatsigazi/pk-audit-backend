import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  JUNIOR = 'Junior',
  MANAGER = 'Manager',
  PARTNER = 'Partner',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.JUNIOR,
  })
  role: Role;
}