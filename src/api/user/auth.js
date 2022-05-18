const conn = require('../../lib/mysql');
const { Router } = require('express');

const AuthService = require('../../service/Auth');

const router = Router();
const Service = new AuthService(conn());

router.post('/login', async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const loginResult = await Service.Login(id, password);

    return res.json({
      result: true,
      token: loginResult,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const { id, password, nickname } = req.body;

  try {
    await Service.Signup(id, password, nickname);

    return res.json({
      result: true,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/guest', async (req, res, next) => {
  try {
    return res.json({
      result: true,
      credentials: await Service.GuestLogin(),
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
