import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base-entity';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ name: 'published_year', type: 'int', nullable: true })
  publishedYear: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  genre: string;
}
