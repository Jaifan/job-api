const express = require('express');
const router = express.Router();
const {registerCreate,registerGetAllUser,login} = require('../controller/auth')

router.route('/register').post(registerCreate).get(registerGetAllUser);
router.route('/login').post(login);

module.exports = router;
