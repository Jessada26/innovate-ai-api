import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import hashManager from 'src/utils/hashManager';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

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
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(hashManager, 'passwordEncode')
        .mockReturnValueOnce('hashedpassword');
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

      // Act
      const result = await service.create(createUserDto);

      // Assert
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: 'newuser' },
      });
      expect(hashManager.passwordEncode).toHaveBeenCalledWith('password123');
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
    });

    it('should return an error message if username already exists', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        firstName: 'iefjief',
        lastName: 'ijefef',
        roles: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockUser);

      // Act
      const result = await service.create(createUserDto);

      // Assert
      expect(result).toEqual('username is already exists');
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should be call', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        firstName: 'iefjief',
        lastName: 'ijefef',
        roles: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockUser);

      // Act
      const result = await service.create(createUserDto);

      // Assert
      expect(hashManager.passwordEncode).toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
