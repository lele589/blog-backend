const router = require('express').Router();
const { formValidationUser } = require('../../Middleware/form.middleware');
const usersControllers = require('../../Controllers/admin/users.controllers');


//GET
//# route => /admin/users/login
router.get('/login', usersControllers.getLoginForm);

//# route => /admin/users/register
router.get('/login', usersControllers.getRegisterForm);

// POST
//# route => /admin/users/register
router.post('/register', formValidationUser, usersControllers.registerUser);

//# route => /admin/users/login
router.post('/login', usersControllers.loginUser);

module.exports = router;