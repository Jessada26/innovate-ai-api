import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesAndUsersTable1751903372188 implements MigrationInterface {
    name = 'AddRolesAndUsersTable1751903372188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" uuid, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" uuid, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_relation_roles" ("userIds" uuid NOT NULL, "roleIds" uuid NOT NULL, CONSTRAINT "PK_49984748ba6ab574b890a1c273a" PRIMARY KEY ("userIds", "roleIds"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf4d8ba1846ab97c79575694e7" ON "users_relation_roles" ("userIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_64fac57d0b87833fde37832e9a" ON "users_relation_roles" ("roleIds") `);
        await queryRunner.query(`ALTER TABLE "users_relation_roles" ADD CONSTRAINT "FK_bf4d8ba1846ab97c79575694e78" FOREIGN KEY ("userIds") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_relation_roles" ADD CONSTRAINT "FK_64fac57d0b87833fde37832e9a5" FOREIGN KEY ("roleIds") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_relation_roles" DROP CONSTRAINT "FK_64fac57d0b87833fde37832e9a5"`);
        await queryRunner.query(`ALTER TABLE "users_relation_roles" DROP CONSTRAINT "FK_bf4d8ba1846ab97c79575694e78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64fac57d0b87833fde37832e9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf4d8ba1846ab97c79575694e7"`);
        await queryRunner.query(`DROP TABLE "users_relation_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
