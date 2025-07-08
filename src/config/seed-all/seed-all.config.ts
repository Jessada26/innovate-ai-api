import { DataSource } from "typeorm";
import { configDataSeedSource } from "./seed.config";

export const compileDataSeedSource = new DataSource({
  ...configDataSeedSource,
});
