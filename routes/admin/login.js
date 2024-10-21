var express = require('express');
var router = express.Router();
const save = require('../../controller/admin/login');
router.post('/', save.login);

module.exports = router;
  