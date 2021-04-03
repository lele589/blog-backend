const router = require('express').Router();

// GET
//# route => /admin/posts
router.get('/', function(req, res, next) {
    res.render('pages/posts/list', { username: req.cookies.username});
});

//# route => /admin/posts/new
router.get('/new', function(req, res, next) {
    res.send('Form para crear un post');
});

//# route => /admin/posts/edit/:idPost
router.get('/edit/:idPost', function(req, res, next) {
    res.send('Form para editar un post --> ' + req.params.idPost);
});

// POST
//# route => /admin/posts/create
router.post('/create', function(req, res, next) {
    res.send('Enviar datos del form para crear un post');
});

//# route => /admin/posts/update
router.post('/update', function(req, res, next) {
    res.send('Enviar datos del form para editar un post');
});

//# route => /admin/posts/delete
router.post('/delete', function(req, res, next) {
    res.send('Eliminar un post');
});

module.exports = router;