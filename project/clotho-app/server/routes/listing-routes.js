const router = require('express').Router();
const listings = require("../controllers/listing-controller.js");
const auth = require("../controllers/auth.js");

// get all available items
router.get('/', listings.findAll);

// get all not deleted by seller
router.get('/seller/:username', listings.findAllBySeller); //FIXME username regex

// get by id
router.get('/:id([0-9]+)', listings.findById);

// create new listing
router.post('/', auth.getToken, auth.getUser, listings.create);

// update listing by id
router.put('/:id([0-9]+)', auth.getToken, auth.getUser, listings.updateById);

// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, listings.deleteById);

module.exports = router; 