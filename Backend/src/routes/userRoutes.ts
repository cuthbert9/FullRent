import express from "express";
import {
    getAllAgents,
    getAgentById,
    getAllProperties,
    getPropertyById,
    getReviewsByPropertyId,
    getGalleryByPropertyId,
} from "../controllers/userController"; // Import controllers
import {Router } from 'express';
import {Request, Response} from "express";

const userRouter = Router();



// TEST ROUTE
userRouter.get("/testDB", async (_req: Request, res: Response) => {
    try {
        // Return a simple success message
        const message = "API is working correctly!";

        res.status(200).json({ message });
    } catch (error) {
        console.error("Error occurred in /test route:", error);
        res.status(500).json({ error: "Failed to fetch the test message" });
    }
});
//Not Working

/* ==========================





   📌 AGENTS ROUTES
========================== */
userRouter.get("/agents", async (_req, res) => {
    try {
        const agents = await getAllAgents();
        res.json(agents);
    } catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({ error: "Failed to fetch agents" });
    }
});

userRouter.get("/agents/:id", async (req:any, res:any) => {
    try {
        const agent = await getAgentById(Number(req.params.id));
        if (!agent) return res.status(404).json({ error: "Agent not found" });
        res.json(agent);
    } catch (error) {
        console.error("Error fetching agent:", error);
        res.status(500).json({ error: "Failed to fetch agent" });
    }
});

/* ==========================
   📌 PROPERTIES ROUTES
========================== */
userRouter.get("/properties", async (_req, res) => {
    try {
        const properties = await getAllProperties();
        res.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});

userRouter.get("/properties/:id", async (req:any, res:any) => {
    try {
        const property = await getPropertyById(Number(req.params.id));
        if (!property) return res.status(404).json({ error: "Property not found" });
        res.json(property);
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ error: "Failed to fetch property" });
    }
});

/* ==========================
   📌 REVIEWS ROUTES
========================== */
userRouter.get("/properties/:id/reviews", async (req, res) => {
    try {
        const reviews = await getReviewsByPropertyId(Number(req.params.id));
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

/* ==========================
   📌 GALLERY ROUTES
========================== */
userRouter.get("/properties/:id/gallery", async (req, res) => {
    try {
        const images = await getGalleryByPropertyId(Number(req.params.id));
        res.json(images);
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        res.status(500).json({ error: "Failed to fetch gallery images" });
    }
});

export default userRouter;
