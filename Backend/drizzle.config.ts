import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();


export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle ",
    // driver: "pg",
    dialect:"postgresql",
    dbCredentials: {
        // // connectionString: process.env.DATABASE_URL,
        // host: process.env.DB_HOST,
        // port: Number(process.env.DB_PORT),
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_NAME,
        // ssl: process.env.DB_SSL === "true",


        host: "ep-super-thunder-a5rb04i2-pooler.us-east-2.aws.neon.tech",
        port: 5432,
        user: "HouseRent_owner",
        password: "npg_H1SCF2galLpJ",
        database: "HouseRent",
        ssl: true,

        // DB_HOST=ep-super-thunder-a5rb04i2-pooler.us-east-2.aws.neon.tech
        // DB_PORT=5432
        // DB_USER=HouseRent_owner
        // DB_PASSWORD=npg_H1SCF2galLpJ
        // DB_NAME=HouseRent
        // DB_SSL=true

    }

});
