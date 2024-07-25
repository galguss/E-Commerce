let itemId = null;
let deletePath;

function handleProducts(button){
    const order = JSON.parse(button.getAttribute('data-product'));
    const rowData = $(`#products-${order._id}`);
    let bodyProduct = '';
    order.productList.map(item => { 
        bodyProduct += `
            <tr>
                <td>Product: ${item.productName}</td>
                <td>Description: ${item.description}</td>
                <td class="product-price">Price: ${item.price}&#8362;</td>
                <td class="product-description">Quantity: ${item.quantity}</td>
            </tr>
        `;
    });
    rowData.html(bodyProduct);
}

function handleFilter(type) {
$.ajax({
  url: "/user/filter-Order",
  method: "POST",
  contentType: "application/json",
  data: JSON.stringify({
    fullName: $("#fullName").val(),
    date: $("#date").val(),
    status: $("#status").val(),
  }),
  success: function (response) {
    updateProductList(response, type);
  },
  error: function (error) {
    $("#message_error").text(error?.responseJSON?.message);
  },
});
}

function confirmation(id, status){
    $.ajax({
  url: "/user/update-Order",
  method: "PATCH",
  contentType: "application/json",
  data: JSON.stringify({
    id,
    status
  }),
  success: function (response) {
    location.reload();
  },
  error: function (error) {
    $("#message_error").text(error?.responseJSON?.message);
  },
});
}

function handleSearch(type ,url) {
    let obj;
    if(type === "tAccount"){
        obj ={
            address: $("#address").val(),
        }
    }else if(type === "tCategory"){
        obj ={
            category: $("#category").val(),
        }
    }else{
        obj ={
            userId: $("#userId").val(),
        }
    }
    
$.ajax({
  url,
  method: "POST",
  contentType: "application/json",
  data: JSON.stringify(obj),
  success: function (response) {
    updateProductList(response, type);
  },
  error: function (error) {
    $("#message_error").text(error?.responseJSON?.message);
  },
});
}

function updateProductList(array, type) {
const tbody = $(`.${type}`);
tbody.empty();
let productHtml = ``;

if (type === "tAccount") {
array.map(item => { 
    productHtml += `
        <tr>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
            <td>${item.role}</td>
            <td>${item.address}</td>
            <td>${item.phoneNumber}</td>
            <td><button value="${item._id}" onclick="handleData(this.value, 'PATCH', '/admin/user-upgrade',false)">Upgrade</button></td>
            <td><button value="${item._id}" onclick="handleData(this.value, 'PATCH', '/admin/user-update',true)">Edit</button></td>
            <td><button value="${item._id}" onclick="showPopup(this.value, 'account')">Delete</button></td>
        </tr>`;
});
} else if (type === "tCategory") {
array.map(item => {
    productHtml += `
        <tr>
            <td>${item.category}</td>
            <td><button value="${item._id}" onclick="handleData(this.value, 'PATCH', '/admin/edit-category',true)">Edit</button></td>
            <td><button value="${item._id}" onclick="showPopup(this.value, 'category')">Delete</button></td>
        </tr>`;
});
} else if (type === "tOrder") {
array.map((order, index) => {
    productHtml += `
        <tr>
            <td>${order.userId}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.total}&#8362;</td>
            <td>${order.status}</td>
            <td><button value="${index}" data-product='${JSON.stringify(order)}' onclick="handleProducts(this)">Show</button></td>
            <td><button value="${order._id}" onclick="confirmation(this.value, 'confirmed')">Confirmed</button></td>
            <td><button value="${order._id}" onclick="confirmation(this.value, 'not confirmed')">Not Confirmed</button></td>
        </tr>
        <tr id="products-${order._id}" class="products-row"></tr>`;
});
}

tbody.append(productHtml);
}

function handleData(id, method, path, bool){
    if(bool){
        window.location.href = `${path}/${id}`;
    }else{
        $.ajax({
                url: path,
                method: method,
                contentType: "application/json",
                data: JSON.stringify({
                id : (itemId === null)? id : itemId
            }),
                success: function(response) {
                    location.reload();
                },
                error: function() {
                $("#message_error").text(error?.responseJSON?.message);
                }
            });
        }
}

function showPopup(productId, type){
    itemId = productId;
    deletePath = (type === 'account')? '/admin/user-delete' : '/admin/delete-category'
    document.getElementById('popup').style.display = 'flex';
}

document.getElementById('send').addEventListener('click', () => handleData('', 'DELETE', deletePath, false));
document.getElementById('close').addEventListener('click', function() {
    itemId= null;
    document.getElementById('popup').style.display = 'none';
});