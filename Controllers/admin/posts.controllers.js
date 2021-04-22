const Post = require('../../Models/Post');
const dayjs = require('dayjs');

const getPostList = (req, res) => {

    Post.find()
        .then(posts => {
            res.render('pages/posts/list', {
                username: req.cookies.username,
                posts,
                dayjs
            });
        })
        .catch(error => { error: error.message });
};

const getNewPostForm = (req, res) => {

    res.render('pages/posts/form', { 
        post: {},
        title: 'Crear post',
        postUrl: '/admin/posts/create'
    });
};

const getEditPostForm = (req, res) => {
    
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
};

const deletePost = (req, res) => {

    Post.findByIdAndDelete(req.params.idPost)
        .then(deletedPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
};

const createPost = (req, res) => {

    Post.create(req.body)
        .then(newPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
};

const updatePost = (req, res) => {

    Post.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(editedPost => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            res.json({ error: error.message })
        })
};

module.exports = {
    getPostList,
    getNewPostForm,
    getEditPostForm,
    deletePost,
    createPost,
    updatePost
}