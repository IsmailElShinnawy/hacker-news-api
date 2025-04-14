import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, default: '' })
  title: string;

  @Column({ nullable: true, default: '' })
  url: string;

  @Column({ nullable: true, default: new Date(0) })
  createdAt: Date;

  @Column({ nullable: true, default: 0 })
  score: number;
}
