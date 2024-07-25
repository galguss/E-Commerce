$(document).ready(function () {
    $("#category-form").submit(function (event) {
      event.preventDefault();
      let data;
      let url;
      let method;
      if($("#id").val() === ''){
        url = "/admin/create-category";
        method = 'POST';
        data = JSON.stringify({
          category: $("#category").val(),
        })
      } else{
        url = "/admin/update-category";
        method = 'PATCH';
        data = JSON.stringify({
          id: $("#id").val(),
          category: $("#category").val(),
        })
      }

      $.ajax({
        url,
        method,
        contentType: "application/json",
        data,
        success: function (response) {
          window.location.href = "/admin/dashboard";
        },
        error: function (error) {
          $("#message_error").text(error?.responseJSON?.message);
        },
      });
    });
  });