import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('applications')
export class WWApplication extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;
}
