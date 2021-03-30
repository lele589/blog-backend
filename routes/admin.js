const router = require('express').Router();
const postsAdminRouter = require('./admin/posts');

// GET
//# route => /admin
router.get('/', function(req, res, next) {
  res.send('Form para acceder al BO');
});

router.use('/posts', postsAdminRouter);

module.exports = router;