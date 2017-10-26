const express = require('express')
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl')

router.get('/', UserCtrl.read);
router.get('/', UserCtrl.readOne);
router.post('/', UserCtrl.create);
router.put('/:id', UserCtrl.update);
router.delete('/:id', UserCtrl.delete);

module.exports = router;
