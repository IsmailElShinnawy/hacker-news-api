import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Story } from './story.entity';

@Entity()
export class Mention {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Story)
  story: Story;

  @Column()
  keyword: string;

  @Column()
  count: number;
}
