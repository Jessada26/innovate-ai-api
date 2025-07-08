import { DataSource } from "typeorm";
import { configDataSource } from "./migration.config";

export const compileDataSource = new DataSource({
  ...configDataSource,
});
