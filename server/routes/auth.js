const express = require('express')
const router = express.Router();
const AuthCtrl = require('../controllers/authCtrl')

router.post('/login', AuthCtrl.login);
router.post('/isAdmin', AuthCtrl.isAdmin);
router.post('/register', AuthCtrl.register);

module.exports = router;
