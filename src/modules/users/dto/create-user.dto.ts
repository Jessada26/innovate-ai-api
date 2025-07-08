import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { RoleEntity } from "src/modules/roles/entities/role.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsArray()
  roles: RoleEntity[];
}
