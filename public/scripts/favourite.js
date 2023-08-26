$(document).ready(function() {

  // Trigger the event handle function when an element in fav-feature class is clicked on
  $(".fav-feature").on("click", function(event) {

    const element = $(event.target);

    // get item_id from the href of the 'Specification' button
    const itemHref = element.closest(".card-body").children("a").attr("href");
    const item_id = itemHref.substring(17);

    let urlPath = '';
    let button = '';

    // assign urlPath and button string variable accordingly if the 'Unfavourite' button is clicked
    if (element.hasClass("unfavourite")) {
      urlPath = `/api/users/items/remove_favourite/${item_id}`;
      button = "<button type='button' class='btn btn-info favourite'>Favourite</button>"
    }

    // assign urlPath and button string variable accordingly if the 'Favourite' button is clicked
    if (element.hasClass("favourite")) {
      urlPath = `/api/users/items/add_favourite/${item_id}`;
      button = "<button type='button' class='btn btn-primary unfavourite'>Unfavor</button>"
    }

    // prevent sending data to backend and loading the response page
    event.preventDefault();

    // AJAX call after the button is clicked. Send POST request to the urlPath & log messages to console on success or error
    $.ajax({
      url: urlPath,
      type: "POST",

      success: function() {
        console.log("Button toggled!");
      },

      error: function(error) {
        console.log("Toggling failed! Error Message: ", error);
      }
    })

      // replace the button with the other one after clicked
      .then(() => {
        element.replaceWith(button);
      });



  });
});
