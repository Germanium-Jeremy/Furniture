import { Request, Response, NextFunction } from "express";
import Furniture from "@/models/Furniture";
import process from "process";
import { IError } from "@/middleware/error";

export const addFurniture = async (req: Request, res: Response, next: NextFunction) => {
     console.log("Adding furniture")
     res.status(200).json({
          message: "Adding furniture",
     })
}