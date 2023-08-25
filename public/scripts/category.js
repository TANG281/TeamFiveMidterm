// This file handles SPA functionality (live update of functions without reload)
// on the `category.ejs` file.


// Checks if the HTML document is fully loaded.
$(document).ready(function() {


  // FILTER DROPDOWN MENU EVENT HANDLER
  $("#Filter-Function .dropdown-menu").click("select", function(event) {

    // Test if the Event Handler is firing when a filter value is selected.
    // console.log(event.target);

    const selectedFilter = $(event.target).html();
    // console.log(`The selected filter: ${selectedFilter}`);


    // SUPPRESS DEFAULT EVENT REACTION
    // The default response is the send data to the backend and refresh the
    // page, which we don't want hear. Instead, we'll suppress the default
    // response and send the data to the backend via an AJAX call.
    event.preventDefault();


    // POPULATE THE PATH TO THE BACKEND
    // Extract the page's resource from the URL.
    // [Show look like this: `/api/users/items/categories/miniPCs`]
    const pathURL = window.location.pathname;

    // Then trim the route portion of the string, leaving only the category's ID.
    // [Show look like this: `miniPCs`]
    const category_id = pathURL.substring(28);

    // Then, create a path to the backend route which does filtering and
    // populate it.
    const filterPath = `/api/users/categories/${category_id}/filter`;
    // console.log(filterPath);


    // QUERY BACKEND AND RETRIEVE ELEMENTS THAT MATCH FILTER
    // Send the selected filter to the backend so that it can query the
    // database for it.
    $.ajax({

      url: filterPath,
      type: "GET",
      data: selectedFilter,

      success: function(returnValue) {
        console.log("The Filter was Successfully Passed to the Backend!");
        console.log(returnValue);
      },

      error: function(error) {
        console.log("The Filter did NOT Reach the Backend! Error Message: ", error);
      }

    })
      .then((result) => {

        // console.log(result);

        // REMOVE ALL PRODUCT CARDS FROM THE CATEGORY PAGE
        // If the AJAX call completes without issue and returns a value, then
        // the current card line up needs to be deleted so that the results of
        // the filter can be displayed.
        $("#Product-Cards-Container").empty();
        // console.log("The cards have been removed!");


        // APPEND THE SEARCH TERM TO THE FILTER FUNCTION'S LABEL
        // Extract the `selectedFilter` string from the `result` object.
        const currentFilter = String(Object.keys(result.selectedFilter));

        // Update the Filter Function label to let users know which filter
        // was selected.
        $("#Filter-Label").html(`Search Results for: ${currentFilter}`);


        // DISPLAY THE RETURNED CARDS
        // The AJAX call should have returned an array of objects
        // [`results.data`]. Each object in this array represents an item that
        // met the filter's requirements and needs to be loaded into a product
        // card.
        //
        // In addition, there will be other elements returned in the `result`
        // value. Some of them are: `user_id` and `is_admin` status of the
        // logged in user (from the cookie; will be undefined if user is NOT
        // logged in) and the item's `is_available` status.
        //
        // These values will need to be sent to the `renderProductCards()`
        // function so that it can draw the cards.
        renderProductCards(result.data,
          result.user_id,
          result.is_admin,
          result.data.is_available);

      })
      .catch((error) => {
        console.log(error);
      });

  });


  // RENDER PRODUCT CARDS
  // This function takes a list of items from the database and loads them into
  // product cards!
  const renderProductCards = function(itemsArray, userExists, isAnAdmin) {

    // console.log(userExists, isAnAdmin);

    // Iterate over the `itemsArray` array...
    itemsArray.forEach(item => {

      let cardBody = createProductCard(item, userExists, isAnAdmin);


      // A FAILED EXPERIMENT WHERE I TRIED TO REMOVE BUTTONS AND OTHER ELEMENTS
      // FROM THE CARD WITH JQUERY

      // The mentor tells me this can be done, but its more complicated a path
      // than the alternate. He suggested that I use regular JS code
      // conditionals) in the `createProductCard()` function to manually add
      // and remove buttons instead.

      // if ((userExists === undefined) && (isAnAdmin === undefined)) {

      //   console.log("Here");

      //   // A CSS selector called `hide123` (display:none) was temporarily
      //   // added to `main.scss` in attempt to invoke it here:

      //   // $(cardBody).find(".btn-danger").addClass("hide123");
      //   // $(cardBody).find(".btn-warning").remove();
      //   // $(cardBody).find(".btn-info").remove();

      // }

      // if (!userExists) {

      // }


      // Add product card to the Product Cards container.
      $("#Product-Cards-Container").append(cardBody);


    });

  };

  // CREATE PRODUCT CARD
  // This function creates a product card. NOTE: Due to a lack of time, user
  // input sanitization has not been implemented. This function is NOT safe
  // against XSS attacks!!!
  //
  // BUG: None of the buttons added to this card via this jQuery in this file
  // (Delete, Edit, Favourite) work!
  const createProductCard = function(item, userExists, isAnAdmin) {

    // Create an empty `adminButtons` string...
    let adminButtons = "";

    // console.log(`Is User an Admin: ${isAnAdmin}`)


    // ... and if the user is an administrator, add the following buttons to
    // the string.
    //
    // BUG: For some reason, this conditional check fails `(isAnAdmin)` when
    // a regular user is logged in.

    if (isAnAdmin) {

      adminButtons =
        `
      <button type="button" class="btn btn-danger">Delete</button>
      <button type="button" class="btn btn-warning">Edit</button>
      `;

    }


    // Create an empty `regularUserButtons` string...
    let regularUserButtons = "";


    // ... and if the user exists, add the following buttons to the
    // `regularUserButtons` string.
    if (userExists) {

      regularUserButtons =
        `
      <button type="button" class="btn btn-info">Favourite</button>
      `;

    }


    // HTML Template for the Card's Body. Populate it with values passed into
    // this function:
    $card =
      `
        <!-- CARD BODY -->
        <div class="card-body bg-light">

          <!-- PRODUCT NAME -->
          <h5 class="card-title">${item.title}</h5>

          <!-- The First Row of Buttons -->
          <div id="User-Buttons">

            ${adminButtons}

            ${regularUserButtons}

          </div>

          <!-- Product Image -->
          <img src="${item.images_url}" class="card-img-top" alt="Item Image">

          <!-- Price Tag -->
          <p><span>${item.price}</span> CAD</p>


          <!-- Specifications Button -->
          <a href="/api/users/items/<%=item.id%>" type="button" class="btn btn-success">Specifications</a>

        </div>
      `;


    return $card;
  };



  // DELETE AN ITEM FROM THE DATABASE
  //
  // When the `Delete` button (`btn-danger`) is clicked in a product card,
  // trigger this event handler function.
  $(".card-body .btn-danger").on("click", function(event) {

    // SUPPRESS DEFAULT EVENT REACTION

    // The default behaviour when a form is submitted is to send the data to
    // the backend and load the response page. This is not what we want here,
    // so we will prevent the default response.
    event.preventDefault();

    // console.log(event);


    // EXTRACT THE ITEM'S ID & CREATE A PATH TO THE BACKEND
    //
    // The only element in the card that contains the item id number is the
    // `href` attribute of the `Specifications` button. So, go through the
    // event target (`Delete` button), and select its card body. Search the
    // card's children for an `a` element and select its `href` attribute.
    const itemHref = $(event.target).closest(".card-body").children("a").attr("href");

    // Then trim the route portion of the string, leaving only the item's ID.
    const item_id = itemHref.substring(17);


    // Then, create a path to the backend route that deletes items and populate
    // it.
    const itemPath = `/api/users/items/delete/${item_id}`;


    // SEND ORDER TO DELETE THIS ITEM TO THE BACKEND VIA AJAX CALL
    $.ajax({

      url: itemPath,
      type: "POST",

      success: function() {

        console.log("The Item was Successfully Deleted!");

      },

      error: function(error) {
        console.log("Item Deletion Failed! Error Message: ", error);
      }

    })
      .then(() => {

        // REMOVE ITEM CARD FROM `category` PAGE
        // If the database successfully deleted the element from the backend,
        // immediately remove the card where the `Delete` button was clicked.
        $(event.target).closest(".card-body").hide();

      });

  });

});
