$(document).ready(function() {

  $(".card-body").on("click", function(event) {
    const element = $(event.target);
    const itemHref = element.closest(".card-body").children("a").attr("href");
    const item_id = itemHref.substring(17);
    const addItemPath = `/api/users/items/add_favourite/${item_id}`;
    const removeItemPath = `/api/users/items/remove_favourite/${item_id}`;
    let itemPath = '';
    let button = '';
    if (!element.hasClass("favourite")) {
      itemPath = `/api/users/items/remove_favourite/${item_id}`;
      button = "<button type='button' class='btn btn-info favourite'>Favourite</button>"
    }
    else {
      itemPath = `/api/users/items/add_favourite/${item_id}`;
      button = "<button type='button' class='btn btn-primary unfavourite'>Unfavourite</button>"
    }
    event.preventDefault();


    $.ajax({
      url: itemPath,
      type: "POST",
      success: function() {
        console.log("Button toggled!");
      },
      error: function(error) {
        console.log("Toggling failed! Error Message: ", error);
      }
    })
      .then(() => {
        element.replaceWith(button);
      });



  });
});
