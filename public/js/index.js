const Cart = new LocalStorage();
      document.getElementById("cart-count").innerText = Cart.quantityCart();
      let itemId = null;

      function handleSearch(role) {
        $.ajax({
          url: "/admin/search-product",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            productName: $("#productName").val(),
          }),
          success: function (response) {
            updateProductList(response, role);
          },
          error: function (error) {
            $("#message_error").text(error?.responseJSON?.message);
          },
        });
    }

    function handleFilter(role) {
      $.ajax({
          url: "/admin/filter-product",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            productName: $("#productName").val(),
            price: $("#price").val(),
            category: $("#category").val(),
          }),
          success: function (response) {
            updateProductList(response, role);
          },
          error: function (error) {
            $("#message_error").text(error?.responseJSON?.message);
          },
        });
    }

    function updateProductList(products, role) {
    const shopSection = $(".shop");
    shopSection.empty();
    let productHtml = ``;

    products.map(product => {
      productHtml += `
            <div class="product">
                <span>${product.productName}</span>
                <div class="image">
                    <img src="${product.pathImage}" alt="product" />
                </div>
                <span class="data">
                    <span>${product.price}&#8362;</span>
                    <span>${product.description}</span>
                </span>
                <div class="actions">
                    <button
                        class="add"
                        data-product='${JSON.stringify(product)}'
                        onclick="Cart.handleCart(this)"
                    >
                        Add
                    </button>`
                  if(role === 'ADMIN'){
                        productHtml +=  `<button
                        value="${product._id}"
                        onclick="showPopup(this.value)"
                        class="delete"
                    >
                        Delete
                    </button>
                    <button class="edit">
                        <a href="/admin/dashboard/update-product/${product._id}"> Edit </a>
                    </button>
                    </div>
                    </div>`
                  }
    })

    shopSection.append(productHtml);
}

      function handleDelete() {
        if (!itemId) return;
        $.ajax({
          url: "/admin/delete-product",
          method: "DELETE",
          contentType: "application/json",
          data: JSON.stringify({
            id: itemId,
          }),
          success: function (response) {
            document.getElementById("popup").style.display = "none";
            location.reload();
          },
          error: function (error) {
            $("#message_error").text(error?.responseJSON?.message);
          },
        });
      }

      function showPopup(productId) {
        itemId = productId;
        document.getElementById("popup").style.display = "flex";
      }

      document.getElementById("send").addEventListener("click", handleDelete);
      document.getElementById("close").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
      });