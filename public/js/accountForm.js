$(document).ready(function () {
    $("#sing_up").submit(function (event) {
      event.preventDefault();
      $.ajax({
        url: "/admin/user-update",
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({
          id: $("#id").val(),
          fullName: $("#full_name").val(),
          email: $("#email").val(),
          address: $("#address").val(),
          phoneNumber: $("#phone_number").val(),
        }),
        success: function (response) {
          window.location.href = "/admin/dashboard";
        },
        error: function (error) {
          $("#message_error").text(error?.responseJSON?.message);
        },
      });
    });
  });