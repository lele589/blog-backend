const router = require('express').Router();
const { formNormalizePost } = require('../../Middleware/form.middleware');
const postsControllers = require('../../Controllers/admin/posts.controllers');

// GET
//# route => /admin/posts
router.get('/', postsControllers.getPostList);

//# route => /admin/posts/new
router.get('/new', postsControllers.getNewPostForm);

//# route => /admin/posts/edit/:idPost
router.get('/edit/:idPost', postsControllers.getEditPostForm);

//# route => /admin/posts/delete/:idPost
router.get('/delete/:idPost', postsControllers.deletePost);

// POST
//# route => /admin/posts/create
router.post('/create', formNormalizePost, postsControllers.createPost);

//# route => /admin/posts/update
router.post('/update', formNormalizePost, postsControllers.updatePost);

module.exports = router;