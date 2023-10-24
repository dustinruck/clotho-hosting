const router = require('express').Router();
const users = require("../controllers/user-controller.js");
const auth = require("../controllers/auth.js");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//get user private profile and listings
router.get('/profile', auth.getToken, auth.getUser, users.findById);

// get public seller profile and listings
router.get('/seller/:username', users.findByUsernamePublic);


// create new user
router.post('/', users.create);

// update profile by id
router.put('/', auth.getToken, auth.getUser, users.updateById);


// delete by id
router.delete('/:id([0-9]+)', auth.getToken, auth.getUser, users.deleteById);

module.exports = router;