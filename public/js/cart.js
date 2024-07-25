const cart = document.getElementById('cart');
const Cart = new LocalStorage();
let products = Cart.getCart();
document.getElementById('total').innerHTML += calculationTotal();
document.getElementById('cart-count').innerHTML = Cart.quantityCart();

let cartBody = ``;

if(products.length === 0){cartBody += "Cart is Empty"}

products.map((product) =>{
  
cartBody+=` <div class="product">
    <div class="image">
    <img src="${product.pathImage}" alt="product">
    </div>
    <span class="data"><span>${product.price}&#8362;</span><span>${product.description}</span></span>
    <span class="count">X${product.quantity}</span>
    <span class="actions"> 
    <button onclick="Cart.handleRemove('${product._id}')" class="delete">Delete</button class="delete">    
    </span>
    </div>`
 });

 function calculationTotal(){
    let total = 0;
    products.map(product => total += Number(product.price) * Number(product.quantity))
    return total;
 }

 function productsArray(){
    let array = [];
    products.map(product => {
        item = {product: product._id, quantity: product.quantity };
        array.push(item);
    });

    return array;
 }

 function handleBay(userId){
    $.ajax({
        url: '/user/create-Order',
        method: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
        userId,
        productList: productsArray(),
        total: calculationTotal()
      }),
        success: function(response) {
            localStorage.removeItem("cart");
            window.location.href = '/home';
        },
        error: function(error) {
          $("#message_error").text(error?.responseJSON?.message);
        }
    });
}

cart.innerHTML = cartBody;