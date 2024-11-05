import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("Id no valid"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  //validation
  body("name").notEmpty().withMessage("Product name must be exists").isString(),

  body("price")
    .notEmpty()
    .withMessage("Price field must be exists")
    .isNumeric()
    .withMessage("Invalid value")
    .custom((value) => value > 0)
    .withMessage("No valid price"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  //validation
  param("id").isInt().withMessage("Id no valid"),
  body("name").notEmpty().withMessage("Product name must be exists").isString(),
  body("price")
    .notEmpty()
    .withMessage("Price field must be exists")
    .isNumeric()
    .withMessage("Invalid value")
    .custom((value) => value > 0)
    .withMessage("No valid price"),
  body("availability").isBoolean().withMessage("Invalid value (boolean)"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no valid"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no valid"),
  handleInputErrors,
  deleteProduct
);

export default router;
