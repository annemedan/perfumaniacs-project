const router = require("express").Router();
const Perfume = require("../models/perfume.model");
const userLoggedIn = require("./../middleware/login-confirmation");

/* GET home page */
router.get("/", (req, res, next) => {
  let userLoggedIn = false;
  const userInfo = req.session.user;
  if (userInfo){
    userLoggedIn = true;
  }
  
  // res.render("index", { userLoggedIn: userLoggedIn, userInfo: userInfo });
  res.render("index", { user: req.session.user });
});




// router.get("/details/:perfumeId", userLoggedIn, (req, res) => {
//   let userLoggedIn = false;
//   const userInfo = req.session.user;
//   if (userInfo){
//     userLoggedIn = true;
//   }
//   res.render("perfume-details", { userLoggedIn: userLoggedIn, userInfo });
// })


module.exports = router;
