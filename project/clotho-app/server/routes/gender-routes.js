const router = require('express').Router();
const genders = require("../controllers/gender-controller.js");
const auth = require("../controllers/auth.js");


// all including deleted
router.get('/', genders.findAllInclDeleted);

// get by id including deleted
router.get('/:id([0-9]+)', genders.findByIdInclDeleted);

// create new
router.post('/', genders.create);

// update name by id
router.patch('/:id([0-9]+)', genders.updateById);

// undelete by id
router.patch('/undelete/:id([0-9]+)', genders.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', genders.deleteById);

/*
After implementing auth in front end, remove above routes and uncomment protected routes below
*/

/*

// all including deleted
router.get('/', auth.getToken, auth.getUser, auth.adminOnly, genders.findAllInclDeleted);

// get by id including deleted
router.get('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, genders.findByIdInclDeleted);

// create new
router.post('/', auth.getToken, auth.getUser, auth.adminOnly, genders.create);

// update name by id
router.patch('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, genders.updateById);

// undelete by id
router.patch('/undelete/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, genders.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, genders.deleteById);

*/
module.exports = router; 