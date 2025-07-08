import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: BookEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [data, total] = await this.bookRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const existing = await this.bookRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.bookRepository.delete(id);
  }
}
