import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity({ name: "roles" })
export class RoleEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  users: UserEntity[];
}
