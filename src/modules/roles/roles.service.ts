import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const roleExists = await this.rolesRepository.findOne({ where: { name } });
    if (roleExists) {
      return 'role is already exists';
    }
    return this.rolesRepository.save(createRoleDto);
  }

  findAll(): Promise<RoleEntity[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
