import express from "express";
import { addFurniture } from "../controllers/furnitureController";
const FurnitureRouter = express.Router()

FurnitureRouter.post("/api/furniture/add", addFurniture)

export default FurnitureRouter