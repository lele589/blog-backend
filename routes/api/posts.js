const router = require('express').Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const dayjs = require('dayjs');
const Post = require('../../models/Post');
const { formNormalize } = require('../middlewares');

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

// POST
//# route => /api/posts
router.post('/', formNormalize, (req, res) => {

    Post.create(req.body)
        .then(newPost => {
            res.json(newPost);
        })
        .catch(error => {
            res.status(error.status).json({ error: error.message })
        })
});

module.exports = router;