import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  // Mock BooksService
  const mockBooksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);

    // เคลียร์ mock แต่ละรอบ
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call booksService.create and return created book', async () => {
      const dto: CreateBookDto = {
        title: 'Test Title',
        author: 'Test Author',
        publishedYear: 2022,
        genre: 'Fiction',
      };

      const result = { id: '1', ...dto };

      mockBooksService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockBooksService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call booksService.findAll and return paginated books', async () => {
      const result = {
        data: [{ id: '1', title: 'Test', author: 'Author' }],
        total: 1,
        page: 1,
        limit: 10,
      };

      mockBooksService.findAll.mockResolvedValue(result);

      expect(await controller.findAll('1', '10')).toEqual(result);
      expect(mockBooksService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should call booksService.findOne and return a book', async () => {
      const book = { id: '1', title: 'Test', author: 'Author' };

      mockBooksService.findOne.mockResolvedValue(book);

      expect(await controller.findOne('1')).toEqual(book);
      expect(mockBooksService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if book not found', async () => {
      mockBooksService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      expect(mockBooksService.findOne).toHaveBeenCalledWith('999');
    });
  });

  describe('update', () => {
    it('should call booksService.update and return updated book', async () => {
      const dto: UpdateBookDto = { title: 'Updated Title' };
      const updatedBook = { id: '1', title: 'Updated Title', author: 'Author' };

      mockBooksService.update.mockResolvedValue(updatedBook);

      expect(await controller.update('1', dto)).toEqual(updatedBook);
      expect(mockBooksService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should call booksService.remove', async () => {
      mockBooksService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(mockBooksService.remove).toHaveBeenCalledWith('1');
    });
  });
});
