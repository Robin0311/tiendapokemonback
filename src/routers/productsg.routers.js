const { Router } = require("express");
const router = Router();
const { getProductsg,createProductsg,updateProductsg,deleteProductsg } = require('../controllers/productsg.controllers')

// localhost:5000/product
router.get("/", getProductsg);

// localhost:5000/product
router.post("/", createProductsg);

// localhost:5000/product/id
router.put("/:id", updateProductsg);

// localhost:5000/product/id
router.delete("/:id", deleteProductsg);

module.exports = router;
