const { Router } = require('express');
const AuthRouter = require('./auth');

const router = Router();

router.use('/auth', AuthRouter);

module.exports = router;
