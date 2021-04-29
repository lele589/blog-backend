const dayjs = require('dayjs');
const { validationResult } = require('express-validator');

const Post = require('../../Models/Post');

const getPostList = (req, res) => {
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
};

const getPostById = (req, res) => {

    Post.findById(req.params.idPost)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'ID does not exist' });
            }
        })
        .catch(error => {
            res.json({ error: error.message })
        });
};

const createPost = (req, res) => {

    Post.create(req.body)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(error => {
            res.status(error.status).json({ error: error.message })
        })
};

const editPost = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    } 

    req.body.date = dayjs();

    Post.findByIdAndUpdate(req.params.idPost, req.body, { new: true })
        .then(updatedPost => {
            if(updatedPost) {
                res.json(updatedPost);
            } else {
                res.status(404).json({ error: 'ID does not exist' });
            }
        })
        .catch(error => {
            res.status(error.status).json({ error: error.message })
        });
};

const deletePost = (req, res) => {

    Post.findByIdAndDelete(req.params.idPost)
        .then(deletedPost => {
            if(deletedPost) {
                res.json(deletedPost);
            } else {
                res.status(404).json({ error: 'ID does not exist' });
            }
        })
        .catch(error => {
            res.status(error.status).json({ error: error.message })
        })
};

module.exports = {
    getPostList,
    getPostById,
    createPost,
    editPost,
    deletePost
}