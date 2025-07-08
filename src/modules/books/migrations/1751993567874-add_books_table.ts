import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBooksTable1751993567874 implements MigrationInterface {
    name = 'AddBooksTable1751993567874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" uuid, "title" character varying NOT NULL, "author" character varying NOT NULL, "published_year" integer, "genre" character varying(100), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
