$(document).ready(function () {
    $("#sing_up").submit(function (event) {
      event.preventDefault();
      $.ajax({
        url: "/user/sing-up",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          fullName: $("#full_name").val(),
          email: $("#email").val(),
          password: $("#password").val(),
          address: $("#address").val(),
          phoneNumber: $("#phone_number").val(),
        }),
        success: function (response) {
          window.location.href = "/user/sign-in";
        },
        error: function (error) {
          $("#message_error").text(error?.responseJSON?.message);
        },
      });
    });
  });