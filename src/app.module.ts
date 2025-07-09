import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { RoleEntity } from './modules/roles/entities/role.entity';
import { BookEntity } from './modules/books/entities/book.entity';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      entities: [UserEntity, RoleEntity, BookEntity],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
