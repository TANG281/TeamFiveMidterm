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
        const date = new Date(message.date);
        const formattedate = date.toLocaleString();
        output += "<p>[" + formattedate + "]</p>  <p><b> From: </b>" + message.name + " </p> <p><b> Item: </b>" + message.title + " </p> <p><b> Message: </b> " + message.content + "</p> <br>";
      }

      modalBody.html(output);
      modal.style.display = "block";
    })
  })


});

