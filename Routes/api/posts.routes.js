const router = require('express').Router();
const { formNormalizePost, formValidationPost } = require('../../Middleware/form.middleware');
const postsControllers = require('../../Controllers/api/posts.controllers');

// GET
//# route => /api/posts
router.get('/', postsControllers.getPostList);

//# route => /api/posts/:idPost
router.get('/:idPost', postsControllers.getPostById);

// POST
//# route => /api/posts
router.post('/', formNormalizePost, postsControllers.createPost);

// PUT
//# route => /api/posts/:idPost
router.put('/:idPost', formValidationPost, postsControllers.editPost);

// DELETE
//# route => /api/posts/:idPost
router.delete('/:idPost', postsControllers.deletePost);

module.exports = router;