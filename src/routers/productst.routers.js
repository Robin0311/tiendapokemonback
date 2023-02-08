const { Router } = require("express");
const router = Router();
const { getProductst,createProductst,updateProductst,deleteProductst } = require('../controllers/productst.controllers')

// localhost:5000/product
router.get("/", getProductst);

// localhost:5000/product
router.post("/", createProductst);

// localhost:5000/product/id
router.put("/:id", updateProductst);

// localhost:5000/product/id
router.delete("/:id", deleteProductst);

module.exports = router;
