import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { BASE } from 'src/enums/base.enum';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    const userIdRequest = req.user.id;
    return this.usersService.profile(userIdRequest);
  }

  // @Roles(ROLE.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    if (req.user.id !== id)
    {
      return BASE.USER_DOES_NOT_PERMISSIONS;
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    if (req.user.id !== id)
    {
      return BASE.USER_DOES_NOT_PERMISSIONS;
    }
    return this.usersService.update(id, updateUserDto);
    //else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.id !== id)
    {
      return BASE.USER_DOES_NOT_PERMISSIONS;
    }
    return this.usersService.remove(id);
  }
}
