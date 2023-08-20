# LHL MIDTERM FRONTEND PROJECT DESIGN

## Considerations

* Will we be using Multi-Page App (MPA) vs SPA? 
* Templates:Are we starting from templates or working from scratch?
* Bootstrap: Will we use bootstrap to draw the all buttons and other elements or write the code from scratch?

* Website Design: Let's get the content and JS code working first. Then, we can work on harmonizing the design. [LOW PRIORITY]


## Project Structure


### JS Files

  * `app.js`: Load the header and footer and any other dynamic content in
    all .html pages.

  * `users.js`: There is no registration or login page for this demo. We will simply log in by going to `GET    /login/:user_id`. During the demo, the demo-er will go to `.../login/regulerUser` OR `.../login/superUser`. This will create a cookie attesting that the user has logged in. This request will re-direct to the Home Page.

  * If the other .html pages need .js files, just add a JS file of the same name as the .html page [e.g.: `add-edit.js` for the `add-edit.html` page.]


### HTML Files

  4 HTML pages for now, one for each wireframe page.


  * `index.html`: MPA [4 categories for products]
  
  * The Home Page: This should be an MPA, because it does NOT need AJAX calls to update the page.

  * Routes:

    *  Read: GET    /


  * `category.html`: SPA page [AJAX Calls: `Filter` function, `Delete`, `Edit` & `Favourite` buttons]

      * Static buttons: While this is a SPA page, there are two static
        elements: `Add` button and `Specifications` button.

      * Routes:

        * GET     `items/categories/:category_id` [Category page]
        * GET     `/items/:item_id` [Product page]


        * POST    `/items/:item_id/update` [Edit Item: `add-edit.html`]
        * POST    `/items/:item_id/fav`    [Favourites Column, `items` table]
        * POST    `items/create_new`       [Add Item: `add-edit.html`]
        * POST    `/items/:item_id/delete` [Delete Popup: Remove item from `items` table]


  * `add-edit.html`: MPA

    There are two ways of arriving at this page: by clicking the `Add` button or the `Edit` item button. The former will produce an empty page and the latter will load information about the existing product from the database, so that the superuser can edit.

    Loading this page: 

      * `Add` button:

        * Route: GET `/items/add`  POST: `/items/create_new`

        * Will never load data from the backend.
        * Will load a blank form for the admin to enter product data into.

      * `Edit` button:

        * Route: GET `/items/:item_id/edit`   POST `/items/:item_id/update`

        * Will always load product data from the backend.
        * Will load a filled out form for the admin to edit.


    Leaving this page:

      * `Cancel` button (on this page).

        The user arrived at this page via either the `Category` or the `Item` page. If the user presses `Cancel`, send them back to the `Category` page.


  * `item.html`: Should be a MPA

    * Route: GET  `/items/:item_id` [Product page]

    * Image: from the `images_url` column in the `items` table.

    * The Specifications/Description box: We just need to make a call to
      the backend to retrieve the `description` column in the `items` table.

    * `Contact Seller` button: Come back to this after finishing the first
      four pages. [LOW PRIORITY]
