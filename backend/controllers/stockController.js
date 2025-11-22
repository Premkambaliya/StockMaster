import { StockModel } from "../models/stockModel.js";

// -------------------------------
// CREATE STOCK
// -------------------------------
export const createStock = async (req, res) => {
  try {
    const { productId, warehouseId, locationId, quantity } = req.body;

    // 1️⃣ Get all stock entries to generate next stockId
    const allStock = await StockModel.getAllStock();
    const nextNumber = allStock.length + 1;

    const stockId = `ST${String(nextNumber).padStart(3, "0")}`;

    const stock = {
      stockId,          // ✔ custom ID (ST001)
      productId,
      warehouseId,
      locationId,
      quantity: quantity || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await StockModel.createStock(stock);

    res.json({
      message: "Stock entry created successfully",
      stock: {
        _id: result.insertedId,
        ...stock
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------------
// GET ALL STOCK
// -------------------------------
export const getAllStock = async (req, res) => {
  try {
    const stock = await StockModel.getAllStock();

    res.json({
      message: "Fetched successfully",
      stock
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------------
// GET STOCK BY stockId (ST001)
// -------------------------------
export const getStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await StockModel.findByStockId(id);

    if (!stock) {
      return res.status(404).json({ message: "Stock record not found" });
    }

    res.json({
      message: "Fetched successfully",
      stock
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------------
// INCREASE STOCK (for Receipts)
// -------------------------------
export const increaseStock = async (req, res) => {
  try {
    const { stockId, qty } = req.body;

    const stock = await StockModel.findByStockId(stockId);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const newQty = stock.quantity + qty;

    await StockModel.updateStock(stockId, { quantity: newQty });

    res.json({
      message: "Stock increased",
      quantity: newQty
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------------
// DECREASE STOCK (for Delivery Orders)
// -------------------------------
export const decreaseStock = async (req, res) => {
  try {
    const { stockId, qty } = req.body;

    const stock = await StockModel.findByStockId(stockId);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    if (stock.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const newQty = stock.quantity - qty;

    await StockModel.updateStock(stockId, { quantity: newQty });

    res.json({
      message: "Stock decreased",
      quantity: newQty
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------------------
// DELETE STOCK
// -------------------------------
export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await StockModel.deleteStock(id);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
