/*========== Home Swiper ==========*/
var homeSwiper = new Swiper(".home-swiper", {
  spaceBetween: 30,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/*========== เพิ่มแถบเลื่อนตอนจอหด ==========*/
function handleScroll() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', handleScroll);

/*========== New Swiper ==========*/
var newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 18,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/*========== Show Cart ==========*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close');

/*========== Cart show ==========*/
if (cartShop) {
  cartShop.addEventListener("click", () => cart.classList.add('show-cart'));
}

/*========== Cart close ==========*/
if (cartClose) {
  cartClose.addEventListener("click", () => cart.classList.remove('show-cart'));
}

/*========== Show Login ==========*/
const login = document.getElementById('login'),
      loginButton = document.getElementById('login-toggle'),
      loginClose = document.getElementById('login-close');

/*========== Login show ==========*/
if (loginButton) {
  loginButton.addEventListener("click", () => login.classList.add('show-login'));
}

/*========== Login close ==========*/
if (loginClose) {
  loginClose.addEventListener("click", () => login.classList.remove('show-login'));
}

/*========== Show Scroll Up ==========*/
function handleScrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (window.scrollY >= 350) {
    scrollUp.classList.add('show-scrollup');
  } else {
    scrollUp.classList.remove('show-scrollup');
  }
}
window.addEventListener('scroll', handleScrollUp);

/*========== Show Menu ==========*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*========== Menu show/close ==========*/
if (navToggle) {
  navToggle.addEventListener("click", () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener("click", () => navMenu.classList.remove('show-menu'));
}

/*========== Book Filter ==========*/
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.category-filter');

  filters.forEach(filter => {
    filter.addEventListener('change', filterBooks);
  });

  function filterBooks() {
    const activeFilters = Array.from(filters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);

    const books = document.querySelectorAll('.book-item');

    books.forEach(book => {
      const categories = book.getAttribute('data-category').split(',');

      if (activeFilters.length === 0 || activeFilters.some(filter => categories.includes(filter))) {
        book.style.display = 'block';
      } else {
        book.style.display = 'none';
      }
    });
  }

  filterBooks();
});



/*========== เพิ่มสินค้าลงตะกร้า ==========*/
let cartItems = [];
let totalAmount = 0;

function addToCart(productName, price, image) {
    // ค้นหาว่าสินค้าอยู่ในตะกร้าแล้วหรือไม่
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        // ถ้ามีสินค้าในตะกร้าแล้ว เพิ่มจำนวน
        existingItem.quantity += 1;
        existingItem.totalPrice += price;
    } else {
        // ถ้ายังไม่มีสินค้าในตะกร้า เพิ่มสินค้าลงใน cartItems
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1,
            totalPrice: price,
            image: image  // เก็บภาพสินค้า
        });
    }

    // เพิ่มราคารวม
    totalAmount += price;
    displayCart();  // อัปเดตตะกร้า
}

/*========== แสดงสินค้าตะกร้า ==========*/
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // ล้างข้อมูลเก่าก่อน

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__card');
        cartItem.innerHTML = `
            <div class="cart__box">
                <img src="${item.image}" alt="${item.name}" class="cart_img">
            </div>
            <div class="cart__details">
                <h3 class="cart_title">${item.name}</h3>
                <span class="cart_price">฿${item.totalPrice.toFixed(2)}</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box" onclick="decreaseQuantity(${index})">
                            <i class="bx bx-minus"></i>
                        </span>
                        <span class="cart__amount-number">${item.quantity}</span>
                        <span class="cart__amount-box" onclick="increaseQuantity(${index})">
                            <i class="bx bx-plus"></i>
                        </span>
                    </div>
                    <i class="bx bx-trash-alt cart__amount-trash" onclick="removeProduct(${index})"></i>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // อัปเดตราคารวม
    document.getElementById('total-price').textContent = `฿${totalAmount.toFixed(2)}`;
}

/*========== เพิ่มจำนวนสินค้า ==========*/
function increaseQuantity(index) {
    const item = cartItems[index];
    item.quantity += 1;
    item.totalPrice += item.price;
    totalAmount += item.price;
    displayCart();
}

/*========== ลดจำนวนสินค้า ==========*/
function decreaseQuantity(index) {
    const item = cartItems[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice -= item.price;
        totalAmount -= item.price;
        displayCart();
    }
}

/*========== ลบสินค้าออกจากตะกร้า ==========*/
function removeProduct(index) {
    const item = cartItems[index];
    totalAmount -= item.totalPrice;
    cartItems.splice(index, 1);  // ลบสินค้าจากตะกร้า
    displayCart();
}



document.getElementById("checkout-button").addEventListener("click", function() {
  // แสดง overlay
  document.getElementById("body-overlay").style.display = "block";
  
  // แสดงข้อความสำเร็จ
  document.getElementById("success-message").classList.remove("hidden");
  
  // สามารถซ่อนถ้าต้องการให้หายไปหลังจากเวลาหนึ่ง
  setTimeout(() => {
      document.getElementById("success-message").classList.add("hidden");
      document.getElementById("body-overlay").style.display = "none"; // ซ่อน overlay
  }, 2000); // แสดงเป็นเวลา 3 วินาที
});

document.getElementById('checkout-button').addEventListener('click', function() {
  // ซ่อน icon
  document.getElementById('icon').style.display = 'none';

  // แสดงข้อความสั่งซื้อเสร็จสิ้น
  document.getElementById('success-message').classList.remove('hidden');

  // แสดง overlay
  document.getElementById('body-overlay').style.display = 'block';

  // เคลียร์สินค้าออกจาก My Cart
  const cartItemsContainer = document.getElementById('cart-items');
  
  // เช็คว่าตะกร้ามีสินค้าอยู่หรือไม่
  if (cartItemsContainer.innerHTML) {
      cartItemsContainer.innerHTML = ''; // ลบทุกอย่างใน container
      document.getElementById('cart-items-count').innerText = '0 items'; // อัปเดตจำนวนสินค้า
      document.getElementById('total-price').innerText = '฿0.00'; // อัปเดตราคาทั้งหมด
  }
});

document.getElementById('checkout-button').addEventListener('click', function() {
  console.log("Button clicked"); // เช็คว่ากดปุ่มแล้ว
  const cartItemsContainer = document.getElementById('cart-items');

  if (cartItemsContainer.innerHTML) {
      console.log("Clearing cart items"); // เช็คว่ามีสินค้าหรือไม่
      cartItemsContainer.innerHTML = ''; // เคลียร์สินค้า
      document.getElementById('cart-items-count').innerText = '0 items'; // อัปเดตจำนวนสินค้า
      document.getElementById('total-price').innerText = '฿0.00'; // อัปเดตราคาทั้งหมด
  }
});


function openModal(title, imgSrc, description, price) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-img').src = imgSrc;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-price').textContent = price;

  // แสดง modal
  document.getElementById('product-modal').style.display = 'block';
}

// ปิด modal
document.getElementById('modal-close').onclick = function() {
  document.getElementById('product-modal').style.display = 'none';
}

// ปิด modal เมื่อคลิกนอก modal
window.onclick = function(event) {
  const modal = document.getElementById('product-modal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}






