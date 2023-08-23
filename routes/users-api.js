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
const cookieParser = require('cookie-parser');

router.use(cookieParser());


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

router.get('/logout', (req, res) => {
  res.clearCookie();
  res.redirect('/');
});

// Rendering Category page
router.get('/items/categories/:category_id', (req, res) => {
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;

  const categoryId = req.params.category_id;

  database.getItemsByCategory(categoryId)
    .then(items => {
      const templateVars = {
        user_id,
        is_admin,
        items
      };
      res.render('category', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });
});

// Rendering Home page
router.get('/', (req, res) => {
  // getting the value from the cookie
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;
  const templateVars = {
    user_id,
    is_admin
  };
  res.render('index', templateVars);
});

router.get('/items/:item_id', (req, res) => {
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;
  const itemId = Number(req.params.item_id);

  database.getItemById(itemId)
    .then(item => {
      const templateVars = {
        user_id,
        is_admin,
        itemId,
        item
      };
      res.render('item', templateVars);
      console.log(templateVars);
    })

    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });
});

//Rendering add_item page for adding new items
router.get('/items/add', (req, res) => {
  res.render('add_edit');
});

//Post route for form submission when creating new item
router.post('/items/create_new', (req, res) => {
  //Extract data from the request body
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const stockstatus = req.body.stockstatus;
  const image_url = req.body.image_url;
  const category = req.body.category;

  // Insert the item into the database
  database.addItem({
    title,
    description,
    price,
    is_available: stockstatus,
    images_url: image_url,
    category
  })
    .then(() => {
      // Redirect to the category page where the item was added
      res.redirect('/category');
    })
      .catch(error => {
        // Handle errors if item insertion fails
        console.error('Error adding item:', error);

      });
});

module.exports = router;
