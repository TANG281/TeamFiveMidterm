function getCookie(name) {
  //add a ; to separate the different cookies so that it can be split in the colling lines of code
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
}

$(document).ready(function() {

  const messageButton = document.getElementById("messageButton");

  const messageForm = document.getElementById("messageForm");

  messageButton.addEventListener("click", function() {
    messageForm.style.display = "block"; // Show the form when button is clicked
  });

  const urlSegments = window.location.pathname.split('/');

  const itemId = urlSegments[urlSegments.length - 1];

  messageForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for demonstration purposes

    const message = messageForm.querySelector("textarea").value;
    const userId = getCookie("user_id");
    console.log(userId);
    console.log("itemId" + itemId);
    console.log(message);

    const url = `/api/users/items/message/${itemId}`

    const messageData = {
      itemId,
      message,
      userId
    };

    $.ajax({
      url: url,
      type: "POST",
      data: messageData,

      success: function() {
        console.log("Message successfully sent!")
        messageTextArea.value = ""
      },

      error: function(error) {
        console.log("Failed to send message. Error: ", error);
      }
    });

    messageForm.style.display = "none";
  });
});
