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

router.get("/edit", userLoggedIn, (req, res) => {
  let userLoggedIn = false;
  const userInfo = req.session.user;
  //console.log(userInfo);
  if (userInfo){
    userLoggedIn = true;
  }
  if (userInfo.store === true){
    res.render("perfumes/perfume-edit", { userLoggedIn: userLoggedIn, userInfo });
  } else {
    res.render("perfumes/perfume-edit", { userLoggedIn: userLoggedIn, userInfo, errorMessage: "You don't have the credentials to access this page" });
  }
  
})

// router.get("/details/:perfumeId", userLoggedIn, (req, res) => {
//   let userLoggedIn = false;
//   const userInfo = req.session.user;
//   if (userInfo){
//     userLoggedIn = true;
//   }
//   res.render("perfume-details", { userLoggedIn: userLoggedIn, userInfo });
// })


module.exports = router;
