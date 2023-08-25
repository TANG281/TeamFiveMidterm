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

const getRecipientId = (item_id) => {

  return database.getAdminByItemId(item_id)
    .then((admin) => {
      console.log(admin)
      return admin.owner_id;
    })
    .catch((err) => {
      console.log("an error occurred");
    })
}

router.post('/items/message/:item_id', (req, res) => {
  const item_id = Number(req.params.item_id);
  const userId = parseInt(req.body.userId);



  getRecipientId(item_id)
  .then((recipientId) => {
    const content = req.body.message;
    const currentDate = new Date();

    const messageInfo = {
        item_id,
        userId,
        recipientId,
        content,
        date: currentDate
    };

    console.log(messageInfo);

    return database.addMessage(messageInfo);
  })
  .then(() => {
    console.log("message successfully added to database");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  })

  console.log("Message post request being hit");
})


// USER LOGIN ROUTE
// [No login page provided, so this route will be triggered via the browser URL.]
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


// USER LOGOUT ROUTE
router.get('/logout', (req, res) => {
  res.clearCookie("is_admin");
  res.clearCookie("user_id");
  res.redirect('/api/users');
});


// RENDER THE HOME PAGE [`index.ejs`]
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


// RENDER THE CATEGORY PAGE [`category.ejs`]
router.get('/items/categories/:category_id', (req, res) => {
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;

  const categoryId = req.params.category_id;

  database.getItemsByCategory(categoryId)
    .then(items => {
      database.getFavouriteItemsId(user_id)
        .then(favouriteItems => {
          const idArray = [];
          favouriteItems.forEach((favouriteItem) => {
            idArray.push(favouriteItem.id);
          });
          const templateVars = {
            user_id,
            is_admin,
            items,
            idArray
          };
          res.render('category', templateVars);
        })
        .catch((err) => {
          console.log(err.message);
          res.send('Inner db function error');
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.send('Outer db function error');
    });
});


// Rendering Favourite page
router.get('/items/favourites', (req, res) => {
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;

  database.getFavouriteItems(user_id)
    .then(items => {
      database.getFavouriteItemsId(user_id)
        .then(favouriteItems => {
          const idArray = [];
          favouriteItems.forEach((favouriteItem) => {
            idArray.push(favouriteItem.id);
          });
          const templateVars = {
            user_id,
            is_admin,
            items,
            idArray
          };
          res.render('category', templateVars);
        })
        .catch((err) => {
          console.log(err.message);
          res.send('Inner db function error');
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.send('Outer db function error');
    });
});

// Add an item to favourite
router.post('/items/add_favourite/:item_id', (req, res) => {
  const user_id = req.cookies.user_id;
  const item_id = Number(req.params.item_id);

  database.addFavoriteItem(user_id, item_id)
    .then(itemCount => {

      console.log(`Added ${itemCount} item to favourite for user with id ${user_id}`);

      // Since this is an AJAX Call, set Status Code to 202 ("Accepted"), and
      // return it to the AJAX function.
      res.status(202).send();
    })
    .catch((error) => {

      console.log(`Cannot favourite item ${item_id}!`);

      // Since this is an AJAX Call, set Status Code to 500 ("Internal Server
      // Error"), and return Error message as a json to the AJAX function.
      res.status(500).json({ error: error.message });
    });
});

// Remove an item from favourite
router.post('/items/remove_favourite/:item_id', (req, res) => {
  const user_id = req.cookies.user_id;
  const item_id = Number(req.params.item_id);

  database.removeFavouriteItem(item_id, user_id)
    .then(itemCount => {
      console.log((`Remove ${itemCount} from user ${user_id}'s favourite list`));
      res.status(202).send();
    })
    .catch((error) => {
      console.log(`Cannot remove favourite item ${item_id}!`);
      res.status(500).json({ error: error.message });
    });

});

//Rendering add_item page for adding new items
router.get('/items/add', (req, res) => {
  // Extract user_id and is_admin from cookies
  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;

  // Prepare template variables
  const templateVars = {
    user_id,
    is_admin,
    item: null
  };

  if (!is_admin) {
    res.redirect('/');
  } else {

    // Render the 'add_edit' template and pass template variables
    res.render('add_edit', templateVars);
  }
});

//Post route for form submission when creating new item
router.post('/items/create_new', (req, res) => {
  //Extract data from the request body
  const title = req.body.title;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const stockstatus = req.body.is_available;
  const images_url = req.body.images_url;
  const category = req.body.category;

  const owner_id = parseInt(req.cookies.user_id);

  // Insert the item into the database
  database.addItem({
    title,
    description,
    price,
    is_available: stockstatus,
    images_url: images_url,
    category,
  }, owner_id)
    .then(() => {
      // Redirect to the category page where the item was added
      res.redirect('/api/users/items/categories/' + category);
    })
    .catch(error => {
      // Handle errors if item insertion fails
      console.error('Error adding item:', error);
    });
});


// DELETE ITEM FROM DATABASE [Via a button in `category.ejs`]
router.post('/items/delete/:item_id', (req, res) => {

  console.log("The Items Delete Server Route is Being Triggered!");

  // const is_admin = req.cookies.is_admin;

  const item_id = Number(req.params.item_id);

  // Call the database to delete the item.
  database.deleteItem(item_id)
    .then(item => {

      console.log(`${item} item was deleted from the database!`);

      // Since this is an AJAX Call, set Status Code to 202 ("Accepted"), and
      // return it to the AJAX function.
      res.status(202).send();

    })
    .catch((error) => {

      console.log(`The deletion of item ${item_id} from the database FAILED!`);

      // Since this is an AJAX Call, set Status Code to 500 ("Internal Server
      // Error"), and return Error message as a json to the AJAX function.
      res.status(500).json({ error: error.message });
    });

});

// Rendering Item page
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
    })

    .catch((err) => {
      console.log(err.message);
      res.send('An error occured');
    });
});

/* ---------------------------------------------------------------------------------*/

router.get('/messages', (req, res) => {

  const user_id = req.cookies.user_id;
  console.log(user_id);

  database.getMessage(user_id)
    .then(data => {
      const messageData = data;
      console.log(data);
      res.json({ messageData });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// RENDERING add_edit page FOR DISPLAYING EDIT FORM FILLED WITH ITEM DETAILS
router.get('/items/edit/:item_id', (req, res) => {

  const user_id = req.cookies.user_id;
  const is_admin = req.cookies.is_admin;
  const itemId = req.params.item_id;

  // Fetch the item data from the database based on itemId
  database.getItemById(itemId)
    .then(data => {
      if (data) {
        const item = data;
        const templateVars = {
          user_id,
          is_admin,
          item, // Pass the fetched item data
        };

        res.render('add_edit', templateVars); // Render the edit form with the item data
      } else {
        // Handle the case where no data was found
        res.status(404).send('Item not found.');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred.');
    });

});
/************************************************************************/
// POST ROUTE TO UPDATE THE ITEM
router.post('/items/edit/:item_id', (req, res) => {

  const itemId = Number(req.params.item_id);
  const itemData = req.body;
  console.log(req.body);
  let availability = true;
  if (itemData.is_available === 'false') {
    availability = false;
  }

  // Update the item data in the database
  database.editItem(itemData, itemId, availability)
    .then(() => {
      res.redirect(`/api/users/items/${itemId}`); // Redirect to the item's details page
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('POST error occurred');
    });
});


// EXPORTS

module.exports = router;
