const { Router } = require("express");
const router = Router();
const auth = require('./../middlewares/authorization')
const { getCustomers,createCustomer, updateCustomers, deleteCustomers, loginCustomer, verificarCustomer } = require('../controllers/customers.controllers')

// localhost:5000/customers
router.get("/", auth, getCustomers);
// router.get("/", auth, getCustomers); lleva auth para autoriacion
// localhost:5000/customers
router.post("/", createCustomer);

// localhost:5000/customers/login
router.post("/login", loginCustomer);

router.get("/verificar", auth, verificarCustomer);


// localhost:5000/customers/{id}
router.put("/:id", auth, updateCustomers);
// localhost:5000/customers/{id}
router.delete("/:id", auth, deleteCustomers);

module.exports = router;
