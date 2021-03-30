const router = require('express').Router();
const postsAdminRouter = require('./admin/posts');

// GET
//# route => /admin
router.get('/', (req, res) => {
  res.render('pages/login');
});

router.use('/posts', postsAdminRouter);

module.exports = router;