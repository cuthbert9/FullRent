"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review = exports.gallery = exports.property = exports.agents = exports.ratingEnum = exports.facilitiesEnum = exports.noOfBedroomsEnum = exports.propertyTypeEnum = exports.agentTypeEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Enums
exports.agentTypeEnum = (0, pg_core_1.pgEnum)("agentType", ["owner", "medium-Man"]);
exports.propertyTypeEnum = (0, pg_core_1.pgEnum)("property_type", [
    "standAlone",
    "condo",
    "apartment",
    "vacation House",
]);
exports.noOfBedroomsEnum = (0, pg_core_1.pgEnum)("no_of_bedrooms", [
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
exports.facilitiesEnum = (0, pg_core_1.pgEnum)("facilities", [
    "parking",
    "basketball",
    "swimming pool",
    "jacuzzi",
    "gym",
    "Laundry",
    "Wi-fi",
]);
exports.ratingEnum = (0, pg_core_1.pgEnum)("rating", ["1", "2", "3", "4", "5"]);
// Agents Table
exports.agents = (0, pg_core_1.pgTable)("agents", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }),
    email: (0, pg_core_1.text)("email").unique(),
    type: (0, exports.agentTypeEnum)("type"),
    phone: (0, pg_core_1.text)("phone"),
    image: (0, pg_core_1.text)("image"),
});
// Property Table
exports.property = (0, pg_core_1.pgTable)("property", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    type: (0, exports.propertyTypeEnum)("type"),
    description: (0, pg_core_1.varchar)("description", { length: 1000 }),
    address: (0, pg_core_1.varchar)("address", { length: 255 }),
    price: (0, pg_core_1.integer)("price"),
    area: (0, pg_core_1.varchar)("area", { length: 100 }),
    no_of_bedrooms: (0, exports.noOfBedroomsEnum)("no_of_bedrooms"),
    bathrooms: (0, exports.noOfBedroomsEnum)("bathrooms"),
    rating: (0, exports.ratingEnum)("rating"),
    geo_location: (0, pg_core_1.text)("geo_location"),
    // Foreign Key to Agents Table
    agent_id: (0, pg_core_1.integer)("agent_id").references(() => exports.agents.id),
});
// Gallery Table (Each Property Can Have Multiple Images)
exports.gallery = (0, pg_core_1.pgTable)("gallery", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    property_id: (0, pg_core_1.integer)("property_id").references(() => exports.property.id), // Linking gallery to property
    image_url: (0, pg_core_1.text)("image_url"),
});
// Review Table (Each Property Can Have Multiple Reviews)
exports.review = (0, pg_core_1.pgTable)("review", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    property_id: (0, pg_core_1.integer)("property_id").references(() => exports.property.id), // Linking reviews to property
    name: (0, pg_core_1.varchar)("name", { length: 255 }),
    image: (0, pg_core_1.text)("image"),
    reviewer: (0, pg_core_1.text)("reviewer"),
    rating: (0, exports.ratingEnum)("rating"),
});
