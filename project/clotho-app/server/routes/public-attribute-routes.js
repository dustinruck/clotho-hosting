const router = require('express').Router();
const categories = require("../controllers/category-controller.js");
const genders = require("../controllers/gender-controller.js");
const sizes = require("../controllers/size-controller.js");

// all available attributes
router.get('/categories', categories.findAll);
router.get('/genders', genders.findAll);
router.get('/sizes', sizes.findAll);

// get by id exclude deleted
router.get('/categories/id/:id([0-9]+)', categories.findById);
router.get('/genders/id/:id([0-9]+)', genders.findById);
router.get('/sizes/id/:id([0-9]+)', sizes.findById);

module.exports = router; 