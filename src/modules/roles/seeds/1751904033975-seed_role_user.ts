import { MigrationInterface, QueryRunner } from "typeorm";
import { RoleEntity } from "../entities/role.entity";
import { compileDataSeedSource } from "../../../config/seed-all/seed-all.config";

const seedRole: Partial<RoleEntity>[] = [
  {
    name: "user",
  },
];

export class SeedRoleUser1751904033975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await compileDataSeedSource.getRepository(RoleEntity).save(seedRole);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
