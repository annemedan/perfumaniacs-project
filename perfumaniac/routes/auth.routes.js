const router = require("express").Router();

const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const userLoggedIn = require("./../middleware/login-confirmation")

const perfumesDb = require("./../perfumes.json");

const SALT_ROUNDS = 10;


//Auth routes here

// GET  /signup
router.get("/signup", (req, res, next) => {
    res.render("auth/signup-form");
  });

  router.post("/signup", (req, res) => {
      console.log(req.body);
    let { username, password, store } = req.body;
        console.log(store);

    const usernameNotProvided = !username || username === "";
    const passwordNotProvided = !password || password === "";
  
    if (usernameNotProvided || passwordNotProvided) {
      res.render("auth/signup-form", {
        errorMessage: "Username and password not defined.",
      });
  
      return;
    }

    if (store == "on") {
        store = true;
    } else {
        store = false;
    }
    
      
     // password strength
    const passwordCheck = zxcvbn(password);
    if (passwordCheck.score < 1){ // we usually use 3 for strong password, but will keep 1 to run tests
      res.render("auth/signup-form", {
          errorMessage: "Password is too weak, try again.",
        });
      return;
    };

    User.findOne({ username: username })
      .then((foundUser) => {
        if (foundUser) {
          throw new Error("Username already in use.")
        }
        return bcrypt.genSalt(SALT_ROUNDS);
      })
      .then((salt) => {
        //comparing the passwords
        console.log("comparing passwords");
        return bcrypt.hash(password, salt);
      })
      .then((hashedPassword) => {
        console.log("created");
        return User.create({ username: username, password: hashedPassword, store });
        
      })
      .then((createdUser) => {
        console.log("created user", createdUser);
        res.redirect('/');
      })
      .catch((err) => {
        res.render("auth/signup-form", { errorMessage: err.message || "Error while trying to sign up" });
      })
  
  });

  //get /login
router.get("/login", (req, res) => {
        res.render("auth/login-form.hbs");
    });

    // post /login

router.post("/login", (req, res) => {
      const { username, password } = req.body;
    
      const usernameNotProvided = !username || username === "";
      const passwordNotProvided = !password || password === "";
    
      if (usernameNotProvided || passwordNotProvided) {
        res.render("auth/login-form", {
          errorMessage: "You need to provide username and password to log in.",
        });
    
        return;
      }
  
      let userLoginInfo;
      User.findOne({ username: username })
        .then((foundUser) => {
          userLoginInfo = foundUser;
          if (!foundUser){
            throw new Error("Credentials not correct. Try again!")
          }
          return bcrypt.compare(password, foundUser.password)
        })
        .then((correctPassword) => {
          if (!correctPassword){
            throw new Error("Credentials not correct. Try again!")
          }
          else if (correctPassword){
            req.session.user = userLoginInfo;
            res.redirect("/");
          }
        })
        .catch((err)=>{
            res.render("auth/login-form", {
                errorMessage: err.message || "Provide username and password.",
              });
        })
        
  })

  //get logout

router.get("/logout", userLoggedIn, (req,res) => {
    req.session.destroy((err) => {
      if (err){
        return res.render("error");
      }
  
      res.redirect("/");
  
    })
})



module.exports = router;