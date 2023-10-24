const router = require('express').Router();
const users = require("../controllers/admin-user-controller.js");
const auth = require("../controllers/auth.js");

// get all
router.get('/', auth.getToken, auth.getUser, auth.adminOnly, users.findAll);

// get by id
router.get('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, users.findById);

// create new user
router.post('/', auth.getToken, auth.getUser, auth.adminOnly, users.create);

// update profile by id
router.put('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, users.updateById);

// undelete by id
router.patch('/undelete/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, users.unDeleteById);

// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, auth.adminOnly, users.deleteById);


module.exports = router; 