$(document).ready(function () {
    $("#sing_in").submit(function (event) {
      event.preventDefault();
      $.ajax({
        url: "/user/sign-in/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          email: $("#email").val(),
          password: $("#password").val(),
        }),
        success: function (response) {
          window.location.href = "/home";
        },
        error: function (error) {
          $("#message_error").text(error?.responseJSON?.message);
        },
      });
    });
  });