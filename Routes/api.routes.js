const router = require('express').Router();

const postsApiRouter = require('./api/posts.routes');
const usersApiRouter = require('./api/users.routes');

router.use('/posts', postsApiRouter);
router.use('/users', usersApiRouter);

module.exports = router;