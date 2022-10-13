const express = require('express');

const { ctrlWrapper } = require('../../utils');
const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

// register

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

module.exports = router;
