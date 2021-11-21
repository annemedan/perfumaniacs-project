const router = require("express").Router();
const userLoggedIn = require("./../middleware/login-confirmation");

/* GET home page */
router.get("/", (req, res, next) => {
  let userLoggedIn = false;
  const userInfo = req.session.user;
  if (userInfo){
    userLoggedIn = true;
  }
  res.render("index", { userLoggedIn: userLoggedIn, userInfo: userInfo });
});




module.exports = router;
