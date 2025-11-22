import express from "express";
import {
  createStock,
  getAllStock,
  getStockById,
  increaseStock,
  decreaseStock,
  deleteStock
} from "../controllers/stockController.js";

const router = express.Router();

router.post("/create", createStock);
router.get("/", getAllStock);
router.get("/:id", getStockById);

router.put("/increase", increaseStock);
router.put("/decrease", decreaseStock);

router.delete("/:id", deleteStock);

export default router;
