import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  const mockUser: UserEntity = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    roles: [], 
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    createdBy: 'o',
    updatedBy: 'o',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'password123',
        firstName: 'iefjief',
        lastName: 'ijefef',
        roles: [],
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);

      // Act
      const result = await controller.create(createUserDto);

      // Assert
      expect(result).toEqual(mockUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Arrange
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce([mockUser]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([mockUser]);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });
});
