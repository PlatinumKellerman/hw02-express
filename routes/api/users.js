const express = require('express');

const { ctrlWrapper } = require('../../utils');
const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

// register
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// verification
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

// re-verification
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmail));

// login
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

// current user
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrentUser));

// logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

// change avatar
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
