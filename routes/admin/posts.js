const router = require('express').Router();
const dayjs = require('dayjs');
const Post = require('../../models/Post');
const { formNormalize } = require('../middlewares');

// GET
//# route => /admin/posts
router.get('/', function(req, res) {

    Post.find()
        .then(posts => {
            res.render('pages/posts/list', {
                username: req.cookies.username,
                posts,
                dayjs
            });
        })
        .catch(error => { error: error.message });
});

//# route => /admin/posts/new
router.get('/new', function(req, res) {

    res.render('pages/posts/form', { 
        post: {},
        title: 'Crear post',
        postUrl: '/admin/posts/create'
    });
});

//# route => /admin/posts/edit/:idPost
router.get('/edit/:idPost', function(req, res) {
    
    Post.findById(req.params.idPost)
        .then(post => {

            if(req.query.publish) {
                post.public = true;
                Post.findByIdAndUpdate(req.params.idPost, post, { new: true })
                    .then(updatedPost => {
                        res.redirect('/admin/posts');
                    })
                    .catch(error => {
                        res.json({ error: error.message })
                    });
            } else {
                res.render('pages/posts/form', {
                    isEditForm: true,
                    post,
                    title: 'Editar post',
                    postUrl: '/admin/posts/update'
                });
            }
            
        })
        .catch(error => console.log(error));
});

//# route => /admin/posts/delete/:idPost
router.get('/delete/:idPost', function(req, res) {

    Post.findByIdAndDelete(req.params.idPost)
        .then(deletedPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
});

// POST
//# route => /admin/posts/create
router.post('/create', formNormalize, (req, res) => {

    Post.create(req.body)
        .then(newPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
});

//# route => /admin/posts/update
router.post('/update', formNormalize, (req, res) => {

    Post.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(editedPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
});

//# route => /admin/posts/update
router.post('/update', function(req, res, next) {
    res.send('Enviar datos del form para editar un post');
});

module.exports = router;