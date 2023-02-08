const { Router } = require("express");
const router = Router();
const { getProductsf,createProductsf,updateProductsf,deleteProductsf } = require('../controllers/productsf.controllers')

// localhost:5000/product
router.get("/", getProductsf);

// localhost:5000/product
router.post("/", createProductsf);

// localhost:5000/product/id
router.put("/:id", updateProductsf);

// localhost:5000/product/id
router.delete("/:id", deleteProductsf);

module.exports = router;
