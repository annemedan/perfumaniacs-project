const router = required("express").Router();

//routes router
// GET  /signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });

module.exports = router;