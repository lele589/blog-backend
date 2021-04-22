const router = require('express').Router();
const postsApiRouter = require('./api/posts.routes');

router.use('/posts', postsApiRouter);

module.exports = router;