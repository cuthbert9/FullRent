import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";


dotenv.config();

// ✅ Initialize PostgreSQL connection
const pool = new Pool({
    // connectionString: `${process.env.DATABASE_URL}`,
    // ssl: { rejectUnauthorized: false },

    host: "ep-super-thunder-a5rb04i2-pooler.us-east-2.aws.neon.tech",
    port: 5432,
    user: "HouseRent_owner",
    password: "npg_H1SCF2galLpJ",
    database: "HouseRent",
    ssl: true,
});

// ✅ Initialize Drizzle ORM
const db = drizzle(pool, { schema });

/* ==========================
   📌 AGENTS CONTROLLERS
========================== */

// ✅ Get All Agents
export const getAllAgents = async () => {
    return await db.select().from(schema.agents);
};

// ✅ Get Agent by ID
export const getAgentById = async (id: number) => {
    // @ts-ignore
    const agent = await db.select().from(schema.agents).where(schema.agents.id.eq(id));
    return agent.length ? agent[0] : null;
};

/* ==========================
   📌 PROPERTIES CONTROLLERS
========================== */

// ✅ Get All Properties
export const getAllProperties = async () => {
    return await db.select().from(schema.property);
};

// ✅ Get Property by ID
export const getPropertyById = async (id: number) => {
    // @ts-ignore
    const property = await db.select().from(schema.property).where(eq(schema.property.id,id));
    return property.length ? property[0] : null;
};

/* ==========================
   📌 REVIEWS CONTROLLERS
========================== */

// ✅ Get All Reviews for a Property
export const getReviewsByPropertyId = async (propertyId: number) => {
    // @ts-ignore
    return await db.select().from(schema.review).where(schema.review.property_id.eq(propertyId));
};

/* ==========================
   📌 GALLERY CONTROLLERS
========================== */

// ✅ Get All Images for a Property
export const getGalleryByPropertyId = async (propertyId: number) => {
    // @ts-ignore
    return await db.select().from(schema.gallery).where(schema.gallery.property_id.eq(propertyId));
};
