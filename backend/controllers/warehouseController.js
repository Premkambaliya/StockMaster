import { WarehouseModel } from "../models/warehouseModel.js";
import { getNextSequence } from "../utils/getNextSequence.js";
// CREATE WAREHOUSE
export const createWarehouse = async (req, res) => {
  try {
    const { name, address, type } = req.body;

    // 1️⃣ Generate safe warehouse ID (WH001, WH002, ...)
    const seq = await getNextSequence("warehouse");
    const warehouseId = `WH${String(seq).padStart(3, "0")}`;

    const warehouse = {
      warehouseId,
      name,
      address,
      type,               // 👉 user-provided
      createdAt: new Date(),
    };

    await WarehouseModel.createWarehouse(warehouse);

    res.json({
      message: "Warehouse created successfully",
      warehouse,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL WAREHOUSES
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await WarehouseModel.getAllWarehouses();

    res.json({
      message: "Fetched successfully",
      warehouses,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET SINGLE BY ID
export const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;

    const warehouse = await WarehouseModel.findById(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.json({
      message: "Fetched successfully",
      warehouse,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

