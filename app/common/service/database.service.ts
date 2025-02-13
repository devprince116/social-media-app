import { DataSource } from "typeorm";;
import dotenv from "dotenv";
dotenv.config();
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;


//  create a function to initialize the database connection;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  port: 3000,
  synchronize: true,
  entities: ["app/common/entity/*.ts"],
  // migrations: ["app/migrations/*.ts"],
  // subscribers: ["app/subscribers/*.ts"],
});

export const initDb = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("DB Connected ");
    })
    .catch((err) => {
      console.log("DB Connection failed: ", err);
    });
};
