
// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post, User } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  // TODO - retrieve all posts from the database for the logged in user

  const postData = await Post.findAll({
    where: { userID: req.session.userID, },
    order : [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  const posts = postData.map((post) => post.get({ plain: true }));
  // render the dashboard template with the posts retrieved from the database
  //default layout is set to main.handlebars, layout need to be changed to dashboard to use dashboard.handlebars
  res.render("admin-all-posts", { layout: "dashboard" });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

// TODO - create logic for the GET route for /new that renders the new post page
router.get("/new", withAuth, async (req, res) => {
// It should display a form for creating a new post
  res.render("admin-new-post", { layout: "dashboard" });
});

// TODO - create logic for the GET route for /edit/:id that renders the edit post page
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)
    include : [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["body", "createdAt", "userID"],
      }
    ];
    if (!postData) {
      res.status(404).json({ message: "No post found with this id: "+ req.params.id });
      return;
    }

    const post = postData.get({ plain: true });
    // console.log(post); //testing purpose
    res.render("admin-edit-post", { layout: "dashboard", post }); //passing the post data to the template might need to edit for correct handlebars
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// It should display a form for editing an existing post

module.exports = router;

