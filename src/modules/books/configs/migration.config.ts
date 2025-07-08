import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { BookEntity } from '../entities/book.entity';

dotenv.config();
export const booksDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: parseInt(env.DB_PORT) || 3306,
  username: env.DB_USERNAME || 'root',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_DATABASE || 'innovateai',
  entities: [BookEntity],
  migrations: ['dist/modules/books/migrations/*.js'],
});
