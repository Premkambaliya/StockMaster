import { getDB } from "../config/db.js";

export const StockModel = {
  // CREATE STOCK ENTRY
  async createStock(data) {
    const db = getDB();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return db.collection("stock").insertOne(data);
  },

  // FIND ALL STOCK ENTRIES
  async getAllStock() {
    const db = getDB();
    return db.collection("stock").find().toArray();
  },

  // FIND BY stockId (ST001)
  async findByStockId(stockId) {
    const db = getDB();
    return db.collection("stock").findOne({ stockId });
  },

  // FIND STOCK BY PRODUCT + LOCATION
  async findStockRecord(productId, warehouseId, locationId) {
    const db = getDB();
    return db.collection("stock").findOne({
      productId,
      warehouseId,
      locationId
    });
  },

  // UPDATE STOCK (increase/decrease/direct update)
  async updateStock(stockId, data) {
    const db = getDB();
    data.updatedAt = new Date();

    return db.collection("stock").updateOne(
      { stockId },
      { $set: data }
    );
  },

  // DELETE STOCK
  async deleteStock(stockId) {
    const db = getDB();
    return db.collection("stock").deleteOne({ stockId });
  }
};
