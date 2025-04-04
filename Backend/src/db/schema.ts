import {
    pgTable,
    serial,
    text,
    varchar,
    integer,
    pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const agentTypeEnum = pgEnum("agentType", ["owner", "medium-Man"]);
export const propertyTypeEnum = pgEnum("property_type", [
    "standAlone",
    "condo",
    "apartment",
    "vacation House",
]);
export const noOfBedroomsEnum = pgEnum("no_of_bedrooms", [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
]);
export const facilitiesEnum = pgEnum("facilities", [
    "parking",
    "basketball",
    "swimming pool",
    "jacuzzi",
    "gym",
    "Laundry",
    "Wi-fi",
]);
export const ratingEnum = pgEnum("rating", ["1", "2", "3", "4", "5"]);

// Agents Table
export const agents = pgTable("agents", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: text("email").unique(),
    type: agentTypeEnum("type"),
    phone: text("phone"),
    image: text("image"),
});

// Property Table
export const property = pgTable("property", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    type: propertyTypeEnum("type"),
    description: varchar("description", { length: 1000 }),
    address: varchar("address", { length: 255 }),
    price: integer("price"),
    area: varchar("area", { length: 100 }),
    no_of_bedrooms: noOfBedroomsEnum("no_of_bedrooms"),
    bathrooms: noOfBedroomsEnum("bathrooms"),
    rating: ratingEnum("rating"),
    geo_location: text("geo_location"),

    // Foreign Key to Agents Table
    agent_id: integer("agent_id").references(() => agents.id),
});

// Gallery Table (Each Property Can Have Multiple Images)
export const gallery = pgTable("gallery", {
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(() => property.id), // Linking gallery to property
    image_url: text("image_url"),
});

// Review Table (Each Property Can Have Multiple Reviews)
export const review = pgTable("review", {
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(() => property.id), // Linking reviews to property
    name: varchar("name", { length: 255 }),
    image: text("image"),
    reviewer: text("reviewer"),
    rating: ratingEnum("rating"),
});


