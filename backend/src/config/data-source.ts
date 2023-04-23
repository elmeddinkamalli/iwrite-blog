import "reflect-metadata";
import { DataSource } from "typeorm";

// Database connection config
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env["DB_URL"],
  synchronize: true,
  logging: false,
  subscribers: [],
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
});
