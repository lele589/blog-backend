const router = require('express').Router();
const postsAdminRouter = require('./admin/posts.routes');
const usersAdminRouter = require('./admin/users.routes');

// GET
//# route => /admin
router.get('/', (req, res) => {
  res.redirect('/admin/users/login');
});

router.use('/posts', postsAdminRouter);
router.use('/users', usersAdminRouter);

module.exports = router;