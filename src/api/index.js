const { Router } = require('express');
const UserRouter = require('./user');

const router = Router();
router.use('/user', UserRouter);

module.exports = router;
