const router = require("express").Router();
const controller = require("../controllers/songController");
const multer = require('multer');
const upload = multer();
const {songUploadValidation} = require('../middlewares/validation_mv');
const uploadType_mv = require('../middlewares/uploadType_mv');
 
router.post('/upload', songUploadValidation(), upload.single('song'), uploadType_mv('audio/ogg', 'audio/mpeg'), controller.uploadAction);
router.get('/getAll', controller.getAllAction);
router.post('/getAsPart', controller.getAsPartAction);
router.post('/update', controller.updateAction);
router.get('/delete/:_id', controller.deleteAction);

module.exports = router;