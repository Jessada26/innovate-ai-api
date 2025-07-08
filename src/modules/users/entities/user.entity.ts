import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/base-entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'users_relation_roles',
    joinColumn: {
      name: 'userIds',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleIds',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
