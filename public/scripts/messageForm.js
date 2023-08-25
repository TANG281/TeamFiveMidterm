function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

$(document).ready(function() {
  const messageButton = $("#messageButton");
  const messageForm = $("#messageForm");
  const alertMessage = $("#alertMessage");

  messageButton.on("click", function() {
    const userId = getCookie("user_id");

    if (!userId || userId === 'undefined') {
      alertMessage.show();
      messageForm.hide();
    } else {
      alertMessage.hide();
      messageForm.show();
    }
  });
});
