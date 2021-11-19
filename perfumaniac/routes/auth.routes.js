const router = required("express").Router();

//Auth routes here

// GET  /signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });

module.exports = router;