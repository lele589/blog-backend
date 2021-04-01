const router = require('express').Router();
const postsAdminRouter = require('./admin/posts');
const usersAdminRouter = require('./admin/users');

// GET
//# route => /admin
router.get('/', (req, res) => {
  res.redirect('/admin/users/login');
});

router.use('/posts', postsAdminRouter);
router.use('/users', usersAdminRouter);

module.exports = router;