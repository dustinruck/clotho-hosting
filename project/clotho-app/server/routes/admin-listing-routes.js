const router = require('express').Router();
const listings = require("../controllers/admin-listing-controller.js");
const auth = require("../controllers/auth.js");

// get all
router.get('/', auth.getToken, auth.getUser, auth.adminOnly, listings.findAll);

// get all by seller
router.get('/seller/:username', auth.getToken, auth.getUser, auth.adminOnly, listings.findAllBySeller); //FIXME username regex

// get by id
router.get('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.findById);

// create new listing
router.post('/', auth.getToken, auth.getUser, auth.adminOnly, listings.create);

// update listing by id
router.put('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.updateById);

// mark sold by id
router.patch('/sold/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.markSold);

// reverse sold by id
router.patch('/unsold/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.markForSale);

// undelete by id
router.patch('/undelete/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, listings.deleteById);

module.exports = router; 