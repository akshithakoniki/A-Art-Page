let cartbtn = document.querySelector('.cart-btn');
let displatdata = document.querySelector('.display-data');
let cartcontainer = document.querySelector('.cart-data');

let artdata = [
    {
        img: 'https://t4.ftcdn.net/jpg/04/21/04/31/360_F_421043104_1oKfElVCsMAEot7sASsEqAxQ7sOTzxdr.jpg',
        name: 'A burst of golden light and quiet fields—Van Gogh’s world alive on canvas.',
        id: 101,
        ship: 'Included',
        price: 899,
        quantity: 1
    },
    {
        img: 'https://i.pinimg.com/236x/ae/67/fc/ae67fca9fa43bbef8237f5b512a958c6.jpg',
        name: 'Blue swirls meet the calm of night, echoing the painter’s restless heart.',
        id: 102,
        ship: 'Included',
        price: 789,
        quantity: 1
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfNc5eDV-yDfUOyZgOjh4svZZZMQsV5OLtyA&s',
        name: 'Sun-kissed strokes and rustic charm fill this pastoral dream',
        id: 103,
        ship: 'Included',
        price: 999,
        quantity: 1
    },
    {
        img: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/09/17/thumbs_b_c_79046bce6565dec63817658bcf50f85c.jpg?v=121803',
        name: 'Energy in every brush mark—color that refuses to stay still.',
        id: 104,
        ship: 'Not Included',
        price: 699,
        quantity: 1
    },
    {
        img: 'https://eclecticlight.co/wp-content/uploads/2021/06/vangoghirises.jpg',
        name: 'Gentle dawn tones mirror Van Gogh’s search for peace.',
        id: 105,
        ship: 'Included',
        price: 1099,
        quantity: 1
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh7do5lVVCMXejOkWLtV7jMM1bO9zIScjnUQ&s',
        name: 'Thick color, bold contrast, emotion without words',
        id: 106,
        ship: 'Not Included',
        price: 1899,
        quantity: 1
    },
    {
        img: 'https://images.saatchiart.com/saatchi/717007/art/6139939/5209723-HSC00001-8.jpg',
        name: 'A modern homage to Van Gogh’s love of landscape light.',
        id: 107,
        ship: 'Included',
        price: 1599,
        quantity: 1
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-o8kVQnSEtNobRTSB84l9o4yWNnT9l7EMA&s',
        name: 'Movement, color, and soul—all in one sweeping view',
        id: 108,
        ship: 'Not Included',
        price: 1499,
        quantity: 1
    },
];

// Display all products
function display(products) {
    if (!displatdata) return;

    let htmlcode = '';
    products.forEach((pro) => {
        htmlcode += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <div class="card-header">
                        <img src="${pro.img}" alt="">
                    </div>
                    <div class="card-body">
                        <h4>${pro.name}</h4>
                        <h6>MRP: $${pro.price}</h6>
                        <p>Faster delivery if ordered before 4:00pm</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn bg-warning form-control add-btn" data-id="${pro.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    displatdata.innerHTML = htmlcode;

    // Add-to-cart button functionality
    let addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            let id = parseInt(this.getAttribute('data-id'));
            let selectedItem = artdata.find(p => p.id === id);

            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Avoid duplicates
            let exists = cartItems.some(item => item.id === id);
            if (!exists) {
                cartItems.push(selectedItem);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                alert('Item added to cart!');
            } else {
                alert('This item is already in your cart.');
            }
        });
    });
}
display(artdata);

// Redirect to cart page
if (cartbtn) {
    cartbtn.addEventListener('click', () => {
        window.location.href = 'satachicart.html';
    });
}

// Show cart page content
function showCart() {
    if (!cartcontainer) return;

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        cartcontainer.innerHTML = "<h4 class='m-5 text-center'>Your cart is empty 🛒</h4>";
        return;
    }

    
    let html = '';
    cartItems.forEach((item, index) => {
        html += `
        <div class="div-1 justify-content-center">
            <div class="card mt-2 d-flex flex-row align-items-center p-3">
                <div class="card-header border-0">
                    <img src="${item.img}" alt="Art" class="img-fluid rounded" style="width: 150px; height: 200px;">
                </div>
                <div class="card-body">
                    <h5>${item.name}</h5>
                    <p class="text-secondary mb-0">Paintings</p>
                    <div>
                        <p class="float-start mb-0">Shipping</p>
                        <p class="float-end mb-0">${item.ship}</p>
                        <div class="clearfix"></div>
                        <p class="float-start mb-0">Artwork Total</p>
                        <p class="float-end mb-0">$${item.price}</p>
                        <div class="clearfix"></div>
                    </div>
                    <button class="btn btn-danger mt-3 remove-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        </div>
        `;
    });

    cartcontainer.innerHTML = html;

    // Remove item
    let removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            let index = this.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            showCart();
        });
    });
}
showCart();

