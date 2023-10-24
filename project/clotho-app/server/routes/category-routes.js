const router = require('express').Router();
const categories = require("../controllers/category-controller.js");
const auth = require("../controllers/auth.js");


// all including deleted
router.get('/', categories.findAllInclDeleted);

// get by id including deleted
router.get('/:id([0-9]+)', categories.findByIdInclDeleted);

// create new
router.post('/', categories.create);

// update name by id
router.patch('/:id([0-9]+)', categories.updateById);

// undelete by id
router.patch('/undelete/:id([0-9]+)', categories.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', categories.deleteById);

/*
After implementing auth in front end, remove above routes and uncomment protected routes below
*/

/*

// all including deleted
router.get('/', auth.getToken, auth.getUser, auth.adminOnly, categories.findAllInclDeleted);

// get by id including deleted
router.get('/:id([0-9]+)',auth.getToken, auth.getUser, auth.adminOnly, categories.findByIdInclDeleted);

// create new
router.post('/', auth.getToken, auth.getUser, auth.adminOnly, categories.create);

// update name by id
router.patch('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, categories.updateById);

// undelete by id
router.patch('/undelete/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, categories.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, categories.deleteById);

*/

module.exports = router; 