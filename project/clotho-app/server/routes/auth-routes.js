const router = require('express').Router();
const auth = require("../controllers/auth.js");

//login
router.post('/login', auth.login);

//logout
router.delete('/logout', auth.getToken, auth.getUser, auth.logout);

//refresh JWT
router.get('/refresh', auth.getToken, auth.refreshToken);


module.exports = router; 