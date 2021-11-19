const router = required("express").Router();

//routes
// GET  /signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });

module.exports = router;