import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", addProduct);

router.delete("/:id", deleteProduct);

// ref.: https://www.slingacademy.com/article/understanding-mongoose-model-find-examples/
router.get("/", getProducts);

router.put("/:id", editProduct);

export default router;
