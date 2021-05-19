const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const asyncErrorHandler: any = (fn: any) => (req: any, res: any, next: any) =>
  fn(req, res, next).catch(next);

const authenticate = asyncErrorHandler(async (req: any, res: any, next: any) => {
  next();
});

router.use(bodyParser.json());
router.use(cookieParser());

router.post('/login', (req: any, res: any) => {
  const { user, password } = req.body;

  console.log(req.body);

  if (user === 'play' && password === 'play') {
    res.cookie('cookie', 'PLAY_COOKIE');

    return res.json({
      session: {
        redirectTo: '/dashboard',
        isAuthorized: true
      }
    });
  } else {
    return res.json({
      session: {
        redirectTo: '/dashboard',
        isAuthorized: false
      }
    });
  }
});

export default router;
