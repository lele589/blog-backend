const router = require('express').Router();
const Post = require('../../models/Post');

// GET
//# route => /api/posts
router.get('/', function(req, res) {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const customLabels = {
        totalDocs: 'totalResults',
        docs: 'results',
        page: 'currentPage',
        limit: 'perPage',
    };
    
    Post.paginate({}, {limit, page, customLabels})
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(error.status).json({ error: error.message })
        });
});

module.exports = router;