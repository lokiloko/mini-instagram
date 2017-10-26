const express = require('express')
const router = express.Router();
const PostCtrl = require('../controllers/postCtrl')
const Image = require('../helpers/imageHelpers')

router.get('/', PostCtrl.read);
router.get('/:id', PostCtrl.readOne);
router.post('/', Image.multer.single('imageFile'), Image.sendUploadToGCS, PostCtrl.create);
router.put('/:id',Image.multer.single('imageFile'), Image.sendUploadToGCS, PostCtrl.update);
router.delete('/:id', PostCtrl.delete);

module.exports = router;
