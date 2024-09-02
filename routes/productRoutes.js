const express = require("express");
const {
  getProductById,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorizeRole } = require('../middlewares/authMiddleware');
const { watch } = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getProduct();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await getProductById(id));
});

router.use(protect);
router.use(authorizeRole('admin'));

router.post("/", createProduct);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    return res.send(await updateProduct(id, body));
  } catch (error) {
    return res.status(400).json({ message: "Invalid data", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await deleteProduct(id));
});

module.exports = router;
