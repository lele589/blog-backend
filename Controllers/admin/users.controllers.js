const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../Models/User');

const getLoginForm = (req, res) => {
    res.render('pages/login');
};

const getRegisterForm = (req, res) => {
    res.render('pages/register');
};

const registerUser = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    req.body.role = 'admin';

    User.create(req.body)
        .then(newUser => {
            res.json({ success: 'Se ha creado el usuario'});
        })
        .catch(error => {
            res.json({ error: 'Se ha producido un error en el registro' })
        })
};

const loginUser = (req, res) => {
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
};

module.exports = {
    getLoginForm,
    getRegisterForm,
    registerUser,
    loginUser
}