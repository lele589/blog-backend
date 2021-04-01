const router = require('express').Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

//GET
//# route => /admin/users/login
router.get('/login', (req, res) => {
    res.render('pages/login');
});

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
    const { email, password } = req.body;
    if(email && password) {
        User.findOne({ email: email })
          .then(user => {
             if (user) {
               const samePass = bcrypt.compareSync(req.body.password, user.password);
               if (samePass) {
                    res.cookie('username' , user.username);
                    res.redirect('/admin/posts');
                  } else {
                    res.render('pages/login', { error: 'El email/password es incorrecto' });
                  }
              } else {
                res.render('pages/login', { error: 'El email/password es incorrecto' });
              }
          })
          .catch(error => {
            res.render('pages/login', { error: error.message });
          })
    } else {
        res.render('pages/login', { error: 'Debes rellenar los campos' });
    }
});

function createToken(user) {
  const payload = {
      userId: user._id,
      expire: dayjs().add(30, 'minutes').unix(),
  }
  return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;