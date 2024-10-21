var express = require('express');
var router = express.Router();
const saveuserCtrl = require('../../controller/admin/register');
router.post('/', saveuserCtrl.saveuser);

module.exports = router;
