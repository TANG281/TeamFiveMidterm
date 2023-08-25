$(document).ready(function() {

  const modal = $('#myModal')[0];

  const span = $('.modal-close')[0];

  const modalBody = $('#modal-message');

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  $('#messages').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users/messages'
    })
    .then((response) => {
      let output = "";
      for (const message of response.messageData){
        output += "<i>[" + message.date + "]</i> From: <b>" + message.name + "</b> Item: " + message.title + " - Message: " + message.content + "<br>";
      }

      modalBody.html(output);
      modal.style.display = "block";
    })
  })


});

