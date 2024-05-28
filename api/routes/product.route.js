import express from "express";
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteProductImages,
  deleteProductReview,
  getProduct,
  getProductReview,
  getProducts,
  newProduct,
  updateProduct,
  uploadProductImages,
} from "../controllers/product.controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/product/:id").get(getProduct);

router
  .route("/admin/product/:id/upload_images")
  .put(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);

router
  .route("/admin/product/:id/delete_images")
  .put(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImages);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/reviews")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReview);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductReview);
router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;
