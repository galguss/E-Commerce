$(document).ready(function () {
    $("#product").submit(function (event) {
      event.preventDefault();

      const form = document.getElementById('product');
      const formData = new FormData(form);
      const url = ($("#id").val() !== "") ? "/admin/update-product" : "/admin/create-product";
      const method = ($("#id").val() !== "") ? "PATCH" : "POST";
      const location = ($("#id").val() !== "") ? "/home" : "/admin/dashboard";

      $.ajax({
        url,
        method,
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          window.location.href = location;
        },
        error: function (error) {
          $("#message_error").text(error?.responseJSON?.message);
        },
      });
    });
  });