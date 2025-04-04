import express, {Request, Response} from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the CORS package

import * as schema from './db/schema'; // Import your schema

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const router=express.Router();
app.use(
    cors({
        origin: ['http://localhost:19006', 'http://localhost:8081'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

app.use(express.json()); // Middleware to parse JSON
app.use('/api', router);

// Database connection setup
const pool = new Pool({
    host: "ep-super-thunder-a5rb04i2-pooler.us-east-2.aws.neon.tech",
    port: 5432,
    user: "HouseRent_owner",
    password: "npg_H1SCF2galLpJ",
    database: "HouseRent",
    ssl: true,
});

// Initialize Drizzle ORM
const db = drizzle(pool, { schema });

// ✅ Test Route - Check if the database is connected
app.get('/test-db', async (_req, res) => {
    try {
        const result = await db.execute(`SELECT NOW();`);
        res.json({ message: 'Database Connected', timestamp: result.rows[0].now });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// ✅ Get All Agents
app.get('/agents', async (_req, res) => {
    try {
        const agents = await db.select().from(schema.agents);
        res.json(agents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ error: 'Failed to fetch agents' });
    }
});

// ✅ Get All Properties
app.get('/properties', async (_req, res) => {
    try {
        const properties = await db.select().from(schema.property);
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});



// Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
