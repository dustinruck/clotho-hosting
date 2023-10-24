const router = require('express').Router();
const orders = require("../controllers/order-controller.js");
const auth = require("../controllers/auth.js");

// get by id
router.get('/:id([0-9]+)', auth.getToken, auth.getUser, orders.findById);

// get all by buyer
router.get('/', auth.getToken, auth.getUser, orders.findAllByBuyer);

// create new order
router.post('/', auth.getToken, auth.getUser, orders.create);

// cancel by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, orders.cancelById);


module.exports = router;  