import products from './products.js';
const cart = () => {
    let listCartHTML = document.querySelector('.list');
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.cartTab .close');
    let iconCartSpan = iconCart.querySelector('span');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let cart = [];

    // open and close tab
    //
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    closeBtn.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })

    const setProductInCart = (idProduct, quantity, position) => {
        if(quantity > 0){
            if(position < 0){
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            }else{
                cart[position].quantity = quantity;
            }
        }else{
            cart.splice(position, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCartHTML();
    }
    const refreshCartHTML = () => {
        let listHTML = document.querySelector('.returnCart .list');
        let totalHTML = document.querySelector('.icon-cart span');
        let totalQuantity = 0;
        listHTML.innerHTML = null;
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let position = products.findIndex((value) => value.id == item.product_id);
            let info = products[position];
            let newITem = document.createElement('div');
            newITem.classList.add('item');
            newITem.innerHTML =
            `
                <div class="image">
                    <img src="${info.image}" />
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">Bs
                ${info.price * item.quantity}
                </div>
                <div class="quantity">
                    <span class="minus" data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${info.id}">+</span>
                </div>
            `;
           listHTML.appendChild(newITem);
        })
        totalHTML.innerText = totalQuantity;
    }   

//EVEN CLICK
    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let position = cart.findIndex((value) => value.product_id == idProduct);
 //       let quantity = null;
        let quantity = position < 0 ? 0 : cart[position].quantity;

        if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
            quantity++;
            setProductInCart(idProduct, quantity, position);
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
    })

    const initApp = () => {
        
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            //addCartToHTML();
        }
        refreshCartHTML();
    }
initApp();
}
export default cart;

/*import products from './products.js';
let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = null;

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(item => {
            if(item){
                let info = products[position];
                let newITem = document.createElement('div');
                newITem.classList.add('item');
                newITem.innerHTML = 
                    `<img src="${info.image}">
                    <div class="info">
                        <div class="name">${info.name}</div>
                        <div class="price">Bs${info.price}/1 product</div>
                    </div>
                    <div class="quantity">
                    <span class="minus" data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${info.id}">+</span>
                    </div>
                    <div class="returnPrice">$${info.price * item.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + item.quantity;
                totalPrice = totalPrice + (info.price * item.quantity);
            }
        })
    }*/
