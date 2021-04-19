const router = require('express').Router();
const postsApiRouter = require('./api/posts');

router.use('/posts', postsApiRouter);

module.exports = router;