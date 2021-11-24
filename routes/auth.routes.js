const router = require("express").Router();

const User = require("./../models/User.model");
const Perfume = require("./../models/perfume.model")
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const userLoggedIn = require("./../middleware/login-confirmation");
const Store = require("../models/store.model");
const Available = require("../models/availability.model");


//import the data 


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
  if (passwordCheck.score < 1) { // we usually use 3 for strong password, but will keep 1 to run tests
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
      if (!foundUser) {
        throw new Error("Credentials not correct. Try again!")
      }
      return bcrypt.compare(password, foundUser.password)
    })
    .then((correctPassword) => {
      if (!correctPassword) {
        throw new Error("Credentials not correct. Try again!")
      }
      else if (correctPassword) {
        req.session.user = userLoginInfo;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide username and password.",
      });
    })

})

//get logout

router.get("/logout", userLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }

    res.redirect("/");

  })
})

//get all perfumes - create a layout for all of them

router.get("/allperfumes", (req, res) => {

  Perfume.find()
    .then((foundPerfumes) => {
      res.render("perfumes/all-perfumes", { foundPerfumes: foundPerfumes, user: req.session.user });
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get("/perfume/:perfumeId", (req, res) => {
  const perfumeId = req.params.perfumeId;
  console.log(perfumeId);
  Perfume.findById(perfumeId)
    .then((foundPerfume) => {
      res.render("perfumes/perfume-details", { foundPerfume: foundPerfume, user: req.session.user });
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get("/perfume/:perfumeId", (req, res) => {
  const perfumeId = req.params.perfumeId;
  Perfume.findById(perfumeId)
    .then((foundPerfume) => {
      res.render("perfumes/perfume-edit", { foundPerfume: foundPerfume, user: req.session.user });
    })
    .catch((err) => {
      console.log(err);
    })
})


//*find by id and DELETE 
router.post("/perfume/:perfumeId/delete", (req, res, next) => {
  const perfumeId = req.params.perfumeId;
  console.log("perfumeId", perfumeId);
  // Perfume.findByIdAndDelete(perfumeId)
  Perfume.findByIdAndRemove(perfumeId)
    .then((result) => {
      res.redirect("/allperfumes");
    })
    .catch((err) => {
      console.log(err);
    })
});

// //* search 

router.get("/perfumes/search", async (req, res) => {
    let query = req.query.q
    console.log(">>---", query);

    let searchResults;
    if (query) {
        let regex = new RegExp(query, 'i', 'g');
        searchResults = await Perfume.find({ $or:
           [ { name: regex  }, {manufacturer: regex} ]
        });

    } else {
        searchResults = [];
    }

    res.render("perfumes/perfume-search", { searchResults, query, user: req.session.user});
});


//*find by id and open edit page 

router.get("/perfume/:perfumeId/edit", userLoggedIn, (req, res) => {
  const perfumeId = req.params.perfumeId;
  Perfume.findById(perfumeId)
    .then((foundPerfume) => {
      res.render("perfumes/perfume-edit", { foundPerfume: foundPerfume, user: req.session.user });
    })
    .catch((err) => {
      console.log(err);
    })
})

//*this edits the perfumes
  router.post("/perfumes/:perfumeId/edit", userLoggedIn, (req, res) => {
    const { name, manufacturer, fragrance, composition } = req.body;
    
    console.log(req.body);
    const perfumeId = req.params.perfumeId;
    Perfume.findByIdAndUpdate(perfumeId, { name, manufacturer, fragrance, composition })
        .then((updatedPerfume) => {
          console.log("updatedPerfume", updatedPerfume);  
          res.redirect("/allperfumes")
        })
        .catch((err)=> {
            console.log(err);
            //res.render("perfumes/perfume-create.hbs")
        })
})


// this creates a new perfume
router.get("/perfumes/add", (req, res, next) => {
  res.render("perfumes/perfume-create.hbs")

});

router.post("/perfumes/add", (req, res) => {
  console.log("got to the post route");
  let { name, manufacturer, fragrance, composition, image } = req.body;
  console.log("after got req body");
  Perfume.create({ name, manufacturer, fragrance, composition, image })
      .then((createdPerfume) => {
        console.log(createdPerfume);
          return res.redirect("/allperfumes")
      })
      .catch((err)=> {
          console.log(err);
          res.render("perfumes/perfume-create.hbs")
      })
})

// save as available

router.post('/available/:perfumeId', async (req, res) => {
  try {
    const inStock = await Available.create({
      user: req.session.user._id,
      perfume: req.params.perfumeId
    });
    res.redirect("/available");
  } catch (error) {
    res.render("error");
    console.log("An error occurred", error);
  }
  console.log();
});

router.get('/available', async (req, res) => {
  try {
    let availables = await Available.find(/*{
      user: req.session.user._id
    }, null, {
      sort: {
        createdAt: -1
      }
    } */).populate("perfume").populate("user");
    console.log("AVAILABLES ARRAY", availables);
    res.render("stores/store-availability.hbs", {
      availables,
      user: req.session.user
    });
  } catch (error) {
    res.render("error");
    console.log("An error occurred", error);
  }
});

// // Delete from favorites

// router.post('/delete-favorite/:recipeId', async (req, res) => {
//   const toDel = await Favorite.findByIdAndRemove(req.params.recipeId);
//   res.redirect('/favorites');
// });


module.exports = router;