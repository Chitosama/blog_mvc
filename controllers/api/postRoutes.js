
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userID: req.session.userID,
        });
        res.redirect('/dashboard').status(200);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            body: req.body.body,
        }, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatePost) {
            res.status(404).json({ message: 'No post found with this with id: '+ req.params.id});
            return;
        }
        res.redirect('/dashboard').status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});


// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletePost) {
            res.status(404).json({ message: 'No post found with this with id: '+ req.params.id});
            return;
        }
        res.redirect('/dashboard').status(200).json(deletePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
