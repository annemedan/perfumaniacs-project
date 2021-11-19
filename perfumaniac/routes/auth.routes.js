const router = required("express").Router();

<<<<<<< HEAD
//Auth routes here

=======
//routes router
>>>>>>> f53e662d5b0aa9d03c718e32f0d401591eac1319
// GET  /signup
router.get("/signup", (req, res) => {
    res.render("auth/signup-form");
  });

module.exports = router;