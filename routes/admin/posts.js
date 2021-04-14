const router = require('express').Router();
const dayjs = require('dayjs');
const Post = require('../../models/Post');

// GET
//# route => /admin/posts
router.get('/', function(req, res) {
    res.render('pages/posts/list', { username: req.cookies.username});
});

//# route => /admin/posts/new
router.get('/new', function(req, res) {
    res.render('pages/posts/new');
});

//# route => /admin/posts/edit/:idPost
router.get('/edit/:idPost', function(req, res) {
    res.send('Form para editar un post --> ' + req.params.idPost);
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
router.post('/create', (req, res) => {
    req.body.public === 'true' ? req.body.public = true : req.body.public = false
    req.body.pets === 'on' ? req.body.pets = true : req.body.pets = false
    req.body.date = dayjs();

    Post.create(req.body)
        .then(newPost => {
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