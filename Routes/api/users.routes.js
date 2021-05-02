const router = require('express').Router();
const { formValidationUser } = require('../../Middleware/form.middleware');
const usersControllers = require('../../Controllers/api/users.controllers');

// POST
//# route => /admin/users/register
router.post('/register', formValidationUser, usersControllers.registerUser);

//# route => /admin/users/login
router.post('/login', usersControllers.loginUser);

module.exports = router;