/*========== Home Swiper ==========*/
var homeSwiper = new Swiper(".home-swiper", {
  spaceBetween: 30,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,  // กำหนดเวลาระหว่างสไลด์ (1000 = 1 วินาที)
    disableOnInteraction: false,  // ให้สไลด์เลื่อนต่อไปแม้ผู้ใช้จะคลิกหรือแตะที่สไลด์
  },
});


/*========== เพิมแถบเลื่อนตอนจอหด ==========*/
function scrollHeader(){
    const header = document.getElementById('header')
    //ถ้าViewpointมากกว่า50จะเปลี่ยนส่วนของ็ำฟกำพ
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)

/*========== New Swiper ==========*/
var newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 18,
  centeredSlide: true,
  slidesPerView: "auto",
  loop: true,

  autoplay: {
    delay: 3000,  // กำหนดเวลาระหว่างสไลด์ (1000 = 1 วินาที)
    disableOnInteraction: false,  // ให้สไลด์เลื่อนต่อไปแม้ผู้ใช้จะคลิกหรือแตะที่สไลด์
  },
});

/*========== Show Cart ==========*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*==========  Cart show ==========*/
if(cartShop){
  cartShop.addEventListener("click", () => {
    cart.classList.add('show-cart')
  })
}

/*==========  Cart close ==========*/
if(cartClose){
  cartClose.addEventListener("click", () => {
    cart.classList.remove('show-cart')
  })
}

/*========== Show login ==========*/
const login = document.getElementById('login'),
      loginButton = document.getElementById('login-toggle'),
      loginClose = document.getElementById('login-close')

/*==========  Login show ==========*/
if(loginButton){
  loginButton.addEventListener("click", () => {
    login.classList.add('show-login')
  })
}

/*==========  Cart close ==========*/
if(loginClose){
  loginClose.addEventListener("click", () => {
    login.classList.remove('show-login')
  })
}

/*==========  Show Scroll Up ==========*/
function scrollUP(){
  const scrollUp = document.getElementById('scroll-up');

  if(this.scrollY >= 350 ) scrollUP.classList.add('show-scrollup'); else scrollUP.classList.remove('show-scrollup')
}
window.addEventListener('scroll', scrollUP)

/*==========  Show Menu ==========*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*==========  Cart close ==========*/
if(navToggle){
  navToggle.addEventListener("click", () => {
    navMenu.classList.add('show-menu')
  })
}

if(navClose){
  navClose.addEventListener("click", () => {
    navMenu.classList.remove('show-menu')
  })
}

/*==========  Book Filter ==========*/
document.addEventListener('DOMContentLoaded', function () {
  // เลือก input ทั้งหมดที่เป็น category filter
  const filters = document.querySelectorAll('.category-filter');

  // เพิ่ม event listener เมื่อมีการเปลี่ยนแปลงการติ๊ก checkbox
  filters.forEach(filter => {
      filter.addEventListener('change', function () {
          filterBooks();
      });
  });

  function filterBooks() {
      // ดึงค่าประเภทที่เลือก
      const activeFilters = Array.from(filters)
          .filter(filter => filter.checked)
          .map(filter => filter.value);

      // เลือกหนังสือทั้งหมด
      const books = document.querySelectorAll('.book-item');

      books.forEach(book => {
          // ดึงประเภทหนังสือจาก data-category และแยกเป็นอาเรย์
          const categories = book.getAttribute('data-category').split(',');

          // แสดงหรือซ่อนหนังสือตามประเภทที่เลือก
          if (activeFilters.length === 0 || activeFilters.some(filter => categories.includes(filter))) {
              book.style.display = 'block';  // แสดงหนังสือ
          } else {
              book.style.display = 'none';  // ซ่อนหนังสือ
          }
      });
  }
  // เรียกใช้ฟังก์ชันกรองหนังสือเมื่อโหลดหน้าเว็บครั้งแรก
  filterBooks();
});

/*==========  Add Crats ==========*/
let cartItems = [];
let totalAmount = 0;

function addToCart(productName, price) {
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
            totalPrice: price
        });
    }

    // เพิ่มราคารวม
    totalAmount += price;
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // ล้างข้อมูลเดิม

    cartItems.forEach(item => {
        const cartItem = document.createElement('p');
        cartItem.textContent = `${item.name} x ${item.quantity} - ฿${item.totalPrice}`;
        cartItemsContainer.appendChild(cartItem);
    });

    // อัปเดตราคารวม
    document.getElementById('total-price').textContent = totalAmount;
}

