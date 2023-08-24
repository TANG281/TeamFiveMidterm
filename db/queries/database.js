const db = require('../connection');

// category is from URL passed as a parameter into this function
const getItemsByCategory = (category) => {
  const queryString = `SELECT * FROM items WHERE category = $1;`;
  return db
    .query(queryString, [category])
    .then((data) => {
      return data.rows; // return an array of objects
    })
};

// itemId is from URL passed as a parameter into this function
const getItemById = (itemId) => {
  const queryString = `SELECT * FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rows[0]; // return an object
    })
};

// itemId is from URL passed as a parameter into this function
const deleteItem = (itemId) => {
  const queryString = `DELETE FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rows; // return the number of row deleted
    })
};

// itemData is data from the form, ownerId is the user id in the cookies session
const addItem = (itemData, ownerId) => {
  const queryString = `INSERT INTO items (owner_id, title, description, price, is_available, images_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  // To clarify if the category names are required in the SQL code in this case?
  return db
    .query(queryString, [ownerId, itemData.title, itemData.description, itemData.price, itemData.is_available, itemData.images_url, itemData.category])
    .then((data) => {
      return data.rows; // return the number of rows posted?
    })
};

// itemData is data from the form, itemId is from the URL eg.(req.params)
const editItem = (itemData, itemId) => {
  const queryString = `UPDATE items SET title = $1, description = $2, price = $3, is_available = $4, images_url = $5, category = $6 WHERE id = $7;`;
  return db
    .query(queryString, [itemData.title, itemData.description, itemData.price, itemData.is_available, itemData.images_url, itemData.category, itemId]) // do not modify the date_posted column because we are only editing the item info
    .then((data) => {
      return data.rows; // return the number of rows edited?
    })
};

// filter items
const filterItems = (options, category) => {

  const queryParams = [];

  const queryString = `SELECT * FROM items `;

  const conditionString = '';

  if (options.minPrice) {
    if (queryParams.length > 0) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.minPrice}`);
    conditionString += `price >= $${queryParams.length}`;
  };

  if (options.maxPrice) {
    if (queryParams.length > 0) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.maxPrice}`);
    conditionString += `price <= $${queryParams.length}`;
  }

  if (options.is_available) {
    if (queryParams.length > 0) {
      conditionString += ` AND `;
    }
    queryParams.push(`${options.is_available}`);
    conditionString += `is_available = $${queryParams.length}`;
  }

  if (conditionString.length > 0) {
    queryString += ` WHERE category = $${queryParams.length + 1}` + conditionString + `;`;
  }

  queryParams.push(category);

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
};

// userId from cookies session
const getFavouriteItems = (userId) => {
  const queryString = `SELECT items.* FROM items JOIN favourites ON items.id = favourites.item_id JOIN users ON users.id = favourites.user_id WHERE users.id = $1;`;
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows;
    })
};

// userId from cookies session, itemId from ?
const addFavoriteItem = (userId, itemId) => {
  const queryString = `INSERT INTO favourites (item_id, user_id) VALUES ($1, $2);`;
  return db
    .query((queryString, [itemId, userId]))
    .then((data) => {
      return data.rows;
    })
};

// get the contact information of the seller, itemIDfrom the URL
const getSellerInfo = (itemId) => {
  const queryString = `SELECT users.name, users.email, users.phone_number FROM users JOIN items ON users.id = items.owner_id WHERE items.id = $1;`;
  return db
    .query((queryString, [itemId]))
    .then((data) => {
      return data.rows;
    })
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
};



module.exports = { getItemsByCategory, getItemById, deleteItem, addItem, editItem, filterItems, getFavouriteItems, addFavoriteItem, getSellerInfo, checkUserIsAdmin };
