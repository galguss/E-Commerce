class LocalStorage{
    constructor(){
        if(!localStorage.getItem("cart")){
            localStorage.setItem("cart",JSON.stringify([]));
        }
    }

    getCart(){ return JSON.parse(localStorage.getItem("cart"))}

    clearCart(event){
        event.preventDefault(); 
        localStorage.removeItem('cart');
        window.location.href = "/user/logout"; 
    }

    handleCart(button){
        const product = JSON.parse(button.getAttribute('data-product'));
        let cart = JSON.parse(localStorage.getItem("cart"));
        let existingProduct = cart.find(item => item._id === product._id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    quantityCart(){
        let cart = JSON.parse(localStorage.getItem("cart"));
        let quantity = 0;
        for(let item of cart){
          quantity += item.quantity;
        }
        return quantity;
      }

    handleRemove(productId){
        let cart = JSON.parse(localStorage.getItem("cart"));
        
        let productIndex = cart.findIndex(item => item._id === productId);
        if (productIndex !== -1) {

        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
        location.reload();
     }
    }
}