// เก็บรายการสินค้าในตะกร้า
let cartItems = [
    { id: 1, title: 'รุ่นน้องตัวป่วนอยากชวนเที่ยวเล่น เล่ม 08', price: 76.00, quantity: 1, image: 'assets/image/cart1.jpg' },
    { id: 2, title: 'ทาสสุดแกร่งแห่งหน่วยป้องกันอสูร slave เล่ม 14', price: 149.00, quantity: 1, image: 'assets/image/cart2.jpg' },
    { id: 3, title: 'สองสิงห์อมควันหลังซูเปอร์มาร์เก็ต เล่ม 3', price: 159.00, quantity: 1, image: 'assets/image/cart3.jpg' }
];

// ฟังก์ชันสำหรับอัปเดตตะกร้าสินค้า
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // ล้างเนื้อหาในตะกร้า
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    // วนลูปผ่านสินค้าใน cartItems เพื่อแสดงผล
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>฿${item.price.toFixed(2)}</p>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;

        // เพิ่มสินค้าใน DOM
        cartItemsContainer.appendChild(cartItemElement);

        // คำนวณราคารวม
        totalPrice += item.price * item.quantity;
    });

    // อัปเดตราคารวมใน DOM
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// ฟังก์ชันสำหรับเปลี่ยนจำนวนสินค้า
function changeQuantity(itemId, amount) {
    const item = cartItems.find(item => item.id === itemId);

    if (item) {
        item.quantity += amount;
        if (item.quantity === 0) {
            removeFromCart(itemId);
        }
    }

    updateCart();
}

// ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCart();
}

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
// ฟังก์ชันสำหรับเพิ่มสินค้าในตะกร้า
function addToCart(title, price, image) {
    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        // ถ้าสินค้ามีอยู่แล้ว เพิ่มจำนวน
        existingItem.quantity += 1;
    } else {
        // ถ้าไม่มีอยู่ในตะกร้า เพิ่มรายการใหม่
        const newItem = {
            id: cartItems.length + 1,
            title: title,
            price: parseFloat(price),
            quantity: 1,
            image: image
        };
        cartItems.push(newItem);
    }

    updateCart(); // อัปเดตตะกร้าหลังเพิ่มสินค้าใหม่
}

// อัปเดตตะกร้าสินค้าครั้งแรก
updateCart();

