import { env } from "process";
import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

dotenv.config();

export const configDataSource: DataSourceOptions = {
  type: "postgres",
  host: env.DB_HOST || "localhost",
  port: parseInt(env.DB_PORT) || 3306,
  username: env.DB_USERNAME || "root",
  password: env.DB_PASSWORD || "password",
  database: env.DB_DATABASE || "innovateai",
  entities: ["dist/modules/**/entities/*.entity.js"],
  migrations: ["dist/modules/**/migrations/*.js"],
  synchronize:
    String(env.DB_SYNCHRONIZE_MIGRATION_ALL_TRACKING).toLowerCase() === "true",
  migrationsTableName: "migrations",
};
