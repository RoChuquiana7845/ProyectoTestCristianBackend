import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers.js";

import authenticateToken from "../middlewares/auth.token.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/",authenticateToken, getProducts);

router.post("/",authenticateToken,validateSchema(createProductSchema), createProduct);

router.get("/:id", authenticateToken, getProduct);

router.put("/:id", authenticateToken, updateProduct);

router.delete("/:id", authenticateToken, deleteProduct);

export default router;

