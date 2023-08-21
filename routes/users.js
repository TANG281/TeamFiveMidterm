const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const getUserFromCookie = function(req) {
  const user_id = req.cookies.user_id;
  if (!user_id) {
    return null;
  }
  const currentUser = database.getUserById(user_id);
  return currentUser;
};

router.get('/login/:id', (req, res) => {
  // or using plain-text cookies to set cookie
  res.cookie('user_id', req.params.id);

  // send the user to home page
  res.redirect('/');
});

router.get('/userinfo', (req, res) => {
  console.log(req.cookies);
  getUserFromCookie(req)
    .then(currentUser => {
      const templateVars = {
      isLoggedIn: true,
      isAdmin: false
    };

    console.log(currentUser);

    if(!currentUser) {
      templateVars.isLoggedIn = false;
    } else {
      if (currentUser.is_admin) {
        templateVars.isAdmin = true;
      }
    }

    res.status(200).json(templateVars);
  })
});

// show the static home page to all users
router.get('/', (req, res) => {
  res.render('index.html');
});

// show all items in a particular category to any user
router.get('/items/categories/:category_id', (req, res) => {

  const category_id = req.params.category_id;

  database.getItemsByCategory(category_id)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// show a particular item to any user
router.get('/items/:item_id', (req, res) => {
  const item_id = req.params.item_id;

  database.getItemById(item_id)
    .then(item => {
      res.json({ item });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/items/create_new', (req, res) => {
  getUserFromCookie(req)
    .then(currentUser => {
      if (!currentUser) {
        res.json({ error: "User not found" });
      }
    })

  res.render('add-edit.html', templateVars);
})

router.get('/items/create_new', (req, res) => {
  res.render('add-edit.html');
});

module.exports = router;
