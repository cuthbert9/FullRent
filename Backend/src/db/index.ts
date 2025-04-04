import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({

    connectionString: `${process.env.DATABASE_URL}`,
    // host: "ep-super-thunder-a5rb04i2-pooler.us-east-2.aws.neon.tech",
    // port: 5432,
    // user: "HouseRent_owner",
    // password: "npg_H1SCF2galLpJ",
    // database: "HouseRent",
    // ssl: true,
});

export const db = drizzle(pool);
