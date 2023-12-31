const db = require('../connection');

// category is from URL passed as a parameter into this function
const getItemsByCategory = (category) => {
  const queryString = `SELECT * FROM items WHERE category = $1;`;
  return db
    .query(queryString, [category])
    .then((data) => {
      return data.rows; // return an array of objects
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// itemId is from URL passed as a parameter into this function
const getItemById = (itemId) => {
  const queryString = `SELECT * FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rows[0]; // return an object
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// itemId is from URL passed as a parameter into this function
const deleteItem = (itemId) => {
  const queryString = `DELETE FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rowCount; // return the number of row deleted
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// itemData is data from the form, ownerId is the user id in the cookies session
const addItem = (itemData, ownerId) => {
  const queryString = `INSERT INTO items (owner_id, title, description, price, is_available, images_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  // To clarify if the category names are required in the SQL code in this case?
  return db
    .query(queryString, [ownerId, itemData.title, itemData.description, itemData.price, itemData.is_available, itemData.images_url, itemData.category])
    .then((data) => {
      return data.rowCount; // return the number of rows posted?
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// itemData is data from the form, itemId is from the URL eg.(req.params)
const editItem = (itemData, itemId,availability) => {
  const queryString = `UPDATE items SET title = $1, description = $2, price = $3, is_available = $4, images_url = $5, category = $6 WHERE id = $7;`;
  return db
    .query(queryString, [itemData.title, itemData.description, itemData.price, availability, itemData.images_url, itemData.category, itemId]) // do not modify the date_posted column because we are only editing the item info
    .then((data) => {
      return data.rows; // return the number of rows edited?
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};


// filter items
const filterItems = (options, category) => {

  // console.log(options, category);
  // console.log(options.is_available);

  const queryParams = [category];
  let queryString = `SELECT * FROM items `;
  let conditionString = '';


  // PRICE FILTERS
  if (options.minPrice) {
    if (queryParams.length > 1) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.minPrice}`);
    conditionString += `price >= $${queryParams.length}`;
  };

  if (options.maxPrice) {
    if (queryParams.length > 1) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.maxPrice}`);
    conditionString += `price <= $${queryParams.length}`;
  }


  // AVAILABILITY FILTER
  //
  // I changed the first check from `options.is_available` to
  // `(options.is_available !== undefined` because if the `is_available` value
  // was `false` (there is no stock), the original conditional check would fail.
  if (options.is_available !== undefined) {
    console.log("The options.is_available is tripped!");
    if (queryParams.length > 1) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.is_available}`);
    // console.log(queryParams);
    conditionString += `is_available = $${queryParams.length}`;
  }

  // console.log(conditionString);


  // APPEND THE CONDITION STRING (if it is not empty)
  if (conditionString.length > 0) {
    queryString += `WHERE category = $1 AND ${conditionString};`;
  }

  // console.log(queryParams, queryString);


  // DATABASE QUERY
  return db
    .query(queryString, queryParams)
    .then((data) => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};


// userId from cookies session
const getFavouriteItems = (userId) => {
  const queryString = `SELECT items.* FROM items JOIN favourites ON items.id = favourites.item_id JOIN users ON users.id = favourites.user_id WHERE users.id = $1;`;
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// userId from cookies session
const getFavouriteItemsId = (userId) => {
  const queryString = `SELECT items.id FROM items JOIN favourites ON items.id = favourites.item_id JOIN users ON users.id = favourites.user_id WHERE users.id = $1;`;
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// userId from cookies session, itemId from ?
const addFavoriteItem = (userId, itemId) => {
  const queryString = `INSERT INTO favourites (item_id, user_id) VALUES ($1, $2);`;
  return db
    .query(queryString, [itemId, userId])
    .then((data) => {
      return data.rowCount;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// remove item from favourite list
const removeFavouriteItem = (item_id, user_id) => {
  const queryString = `DELETE FROM favourites WHERE item_id = $1 AND user_id = $2;`;
  return db
    .query(queryString, [item_id, user_id])
    .then((data) => {
      return data.rowCount;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};


// get the contact information of the seller, itemIDfrom the URL
const getSellerInfo = (itemId) => {
  const queryString = `SELECT users.name, users.email, users.phone_number FROM users JOIN items ON users.id = items.owner_id WHERE items.id = $1;`;
  return db
    .query((queryString, [itemId]))
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

// check if the logged in user is an admin
const checkUserIsAdmin = (userId) => {
  const queryString = `SELECT is_admin FROM users WHERE id = $1;`;
  return db
    .query(queryString, [userId])
    .then((data) => {
      if (data.rows[0].is_admin === true) {
        return 'true';
      } else {
        return 'false';
      };
    })
    .catch((error) => {
      console.log('database query error', error);
    });
};

const addMessage = (messageInfo) => {
  const queryString =`INSERT INTO messages (sender_id, recipient_id, content, item_id, date) VALUES ($1, $2, $3, $4, $5);`;

  return db
    .query(queryString, [messageInfo.userId, messageInfo.recipientId, messageInfo.content, messageInfo.item_id, messageInfo.date])
    .then(() => {
      return "Message saved succcessfuly!";
    })
}

const getAdminByItemId = (item_id) => {
  const queryString =  `SELECT owner_id FROM items WHERE id = $1;`;

  return db
    .query(queryString, [item_id])
    .then((data) => {
      return data.rows[0];
    })
}

const getMessage = (recipientId) => {
  const queryString =  `SELECT title, content, date, users.name FROM messages JOIN users ON sender_id = users.id JOIN items ON item_id = items.id WHERE recipient_id = $1;`;

  return db
    .query(queryString, [recipientId])
    .then((data) => {
      console.log(data.rows)
      return data.rows;
    })
}


module.exports = { getItemsByCategory, getItemById, deleteItem, addItem, editItem, filterItems, getFavouriteItems, getFavouriteItemsId, addFavoriteItem, removeFavouriteItem, getSellerInfo, checkUserIsAdmin, addMessage, getAdminByItemId, getMessage };

