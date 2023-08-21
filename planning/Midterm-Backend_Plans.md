# LHL MIDTERM BACKEND/DATABASE PROJECT DESIGN



* `index.html`- will be a static page with item categories listed. No need to communicate with database

* once user clicks on one of the categories, we will route to the specific category page



  * POST - `/items/create_new` [Add Item: `add-edit.html`]
  * insert new item into the `items` table using `addItem` DB function

  * GET - `/items/create_new` [Add Item: `add-edit.html`]
  * to render the add item page

  * POST - `/items/:item_id/update` [Edit Item: `add-edit.html`]
  * modify an existing item data in the `items` table using `editItem` DB function

  * POST (AJAX) - `/items/:item_id/fav` [`favourites` table]
  * insert new user-items relationship into the `favourites` table using `addFavoriteItem` DB function

  * POST (AJAX) - `/items/:item_id/delete` [Delete Popup for confirmation: Remove item from `items` table]
  * delete an item from `items` table using `deleteItem` DB function

  * GET - `/items/categories/:category_id` [Category page]
  * retrieve category id using URL ":category_id" and use `getItemsByCategory` DB function

  * GET - `/items/:item_id` [Product page]
  * retrive item by :item_id and use `getItemById` DB function

  * GET - `/items/:user_id/favouties`??
  * retrieve all favourite items based on the user ID `getFavouriteItems` DB function

  * (AJAX) Filter by Price and Availability
  * use the `filterItemsByPrice` and `filterItemsByAvailability` DB function

  * GET (AJAX) - `items/:item_id/sellerinfo`
  * retrieving seller info from `users` table using `getSellerInfo` DB function


