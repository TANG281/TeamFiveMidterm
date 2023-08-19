const db = require('../connection');

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

const getItemsByCategory = (category) => {
  const queryString = `SELECT * FROM items WHERE category = $1;`;
  return db
    .query(queryString, [category])
    .then((data) => {
      return data.rows; // return an array of objects
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getItemById = (itemId) => {
  const queryString = `SELECT * FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rows[0]; // return an object
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteItem = (itemId) => {
  const queryString = `DELETE FROM items WHERE id = $1;`;
  return db
    .query(queryString, [itemId])
    .then((data) => {
      return data.rows; // return the number of row deleted
    })
    .catch((err) => {
      console.log(err.message);
    });
};






module.exports = { getItemsByCategory, getItemById, deleteItem };
