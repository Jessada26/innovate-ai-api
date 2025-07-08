import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

dotenv.config();
export const rulesDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: parseInt(env.DB_PORT) || 3306,
  username: env.DB_USERNAME || 'root',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_DATABASE || 'innovateai',
  entities: [RoleEntity, UserEntity],
  migrations: ['dist/modules/roles/migrations/*.js'],
});
