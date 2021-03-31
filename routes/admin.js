const router = require('express').Router();
const postsAdminRouter = require('./admin/posts');
const usersAdminRouter = require('./admin/users');

// GET
//# route => /admin
router.get('/', (req, res) => {
  res.render('pages/login');
});

router.use('/posts', postsAdminRouter);
router.use('/users', usersAdminRouter);

module.exports = router;