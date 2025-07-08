import { UserEntity } from "src/modules/users/entities/user.entity";

export const isCorrectRoles = (roles: string[], user: UserEntity) => {
  return roles.some((role) => {
    const roleSelected = [];
    const rolesUser = user.roles?.find((roleItem) => roleItem?.name === role);
    if (rolesUser) {
      roleSelected.push(rolesUser?.name);
    }
    return roleSelected.includes(role);
  });
};
