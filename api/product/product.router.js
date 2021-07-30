const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createProduct,
  getProductByTitle,
  getProdudctById,
  getProducts,
  updateProduct,
  deleteProduct
} = require("./product.controller");
router.get("/",getProducts);
router.post("/",createProduct);
router.get("/:id",getProdudctById);
router.post("/:title", getProductByTitle);
router.patch("/", updateProduct);
router.delete("/", checkToken, deleteProduct);

module.exports = router;
