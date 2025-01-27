import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass4post",
  database: "typegraphqldb",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.*"]
});
