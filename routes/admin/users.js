const router = require('express').Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// POST
//# route => /admin/users/register
router.post('/register', [
    check('username').exists(),
    check('email').exists().isEmail(),
    check('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('El email ya existe');
        } else {
            return true;
        }
    }),
    check('password').exists().matches(/^([a-zA-Z0-9@*#]{8,15})$/)
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    req.body.rol = 'admin';

    User.create(req.body)
        .then(newUser => {
            res.json({ success: 'Se ha creado el usuario'});
        })
        .catch(error => {
            res.json({ error: 'Se ha producido un error en el registro' })
        })
});

// POST
//# route => /admin/users/login
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
      .then(user => {
         if (user) {
           const samePass = bcrypt.compareSync(req.body.password, user.password);
           if (samePass) {
                  res.json({ 
                      success: 'Login correcto',
                      token: createToken(user)
                  });
              } else {
                  res.json({ error: 'El email/password es incorrecto 2'});
              }
          } else {
              res.json({ error: 'El email/password es incorrecto 1'});
          }
      })
      .catch(error => {
          res.json({ error: error.message })
      })
});

function createToken(user) {
  const payload = {
      userId: user._id,
      expire: dayjs().add(30, 'minutes').unix(),
  }
  return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;