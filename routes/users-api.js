/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');
const cookieSession = require('cookie-session');


router.use(cookieSession({
  name: 'user_id',
  keys: ['nindoking', 'dragonite', 'crobat'],
  maxAge: 30 * 60 * 1000 // Cookies expire in 30 minutes
}));

// Login route
router.get('/login/:id', (req, res) => {
  // set user_id cookie
  res.cookie('user_id', req.params.id);
  // set is_admin cookie by calling database checkUserIsAdmin function
  database.checkUserIsAdmin(req.params.id)
    .then(is_admin => {
      res.cookie('is_admin', is_admin);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });
});

// Rendering Home page
router.get('/', (req, res) => {
  // getting the value from the cookie
  const user_id = req.session.user_id;
  const is_admin = req.session.is_admin;
  const templateVars = {
    user_id,
    is_admin
  };
  res.render('index', templateVars);
});

// Rendering Category page
router.get('/items/categories/:category_id', (req, res) => {
  const user_id = req.session.user_id;
  const is_admin = req.session.is_admin;
  console.log(is_admin);
  console.log(user_id);
  const categoryId = req.params.category_id;
  console.log(categoryId);
  database.getItemsByCategory(categoryId)
  .then(items => {
      // items.forEach((item) => {
      const templateVars = {
        user_id,
        is_admin,
        items
      };
      res.render('category', templateVars);
      // console.log(item);
      // itemsToShow.push(item);
    })
    // .then(console.log(itemsToShow))
    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });
});

// const templateVars = {
//   user_id,
//   is_admin,
//   itemsToShow: items
// };
// res.render('category', templateVars);
// });

// Rendering Item page
router.get('/items/:item_id', (req, res) => {
  const user_id = req.session.user_id;
  const is_admin = req.session.is_admin;
  const itemToShow = []; // Array of item object in a specific category
  const itemId = req.params.item_id;
  database.getItemsById(itemId)
    .then(item => {
      itemToShow.push(item);
    })
    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });

  const templateVars = {
    user_id,
    is_admin,
    itemToShow
  };
  res.render('item.html', templateVars);
});




module.exports = router;
