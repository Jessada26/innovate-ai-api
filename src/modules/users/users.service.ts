import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import hashManager from 'src/utils/hashManager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;
    const usernameExists = await this.usersRepository.findOne({
      where: { username },
    });
    if (usernameExists) {
      return 'username is already exists';
    }
    createUserDto.password = hashManager.passwordEncode(password);

    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .orderBy('users.createdAt', 'DESC')
      .getMany();
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    try {
      const usersData: UserEntity = await this.usersRepository.findOne({
        where: { username },
      });

      if (!usersData) {
        throw new NotFoundException('Not found users data');
      }

      return usersData;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.id = :id', { id })
      .getOneOrFail();
  }

  async profile(id: string): Promise<UserEntity | null> {
    const userProfile = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.id = :id', { id })
      .getOneOrFail();
    delete userProfile.password;
    return userProfile;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { username, password, firstName, lastName, roles } =
      updateUserDto;
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.id = :id', { id })
      .getOneOrFail();
    user.username = username;
    if(password)
    user.password = hashManager.passwordEncode(password);
    user.firstName = firstName;
    user.lastName = lastName;
    user.roles = roles;
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
