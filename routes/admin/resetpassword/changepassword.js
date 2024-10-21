const express = require('express');
const router = express.Router();
const passwordReset = require('../../../controller/resetpassword/changepassword'); // Import your model
router.post('/', passwordReset.reset);

module.exports = router;
