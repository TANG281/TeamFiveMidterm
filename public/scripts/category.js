// This file handles SPA functionality (live update of functions without reload)
// on the `category.ejs` file.


// Checks if the HTML document is fully loaded.
$(document).ready(function() {

  // WORK ON FILTER FUNCTION TOO!



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
